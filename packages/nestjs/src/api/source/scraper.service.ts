import { Injectable, Logger } from '@nestjs/common';
import { Page, chromium } from 'playwright';
import { SourceService } from './source.service';
import { Document } from 'langchain/document';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  private readonly MAX_RETRIES = 3;
  private readonly CONCURRENCY = 5;

  constructor(private sourceService: SourceService) {}

  async extractInternalLinks(page): Promise<string[]> {
    return await page.$$eval('a[href]', (links) => {
      const uniqueLinks = new Set();
      links.forEach((link) => {
        let href = link.href;
        // Remove the fragment (everything from # onwards)
        href = href.split('#')[0];
        if (new URL(href).hostname === new URL(location.href).hostname) {
          uniqueLinks.add(href);
        }
      });
      return [...uniqueLinks];
    });
  }

  private async filterContentWithLLM(chunk: string): Promise<string> {
    // Here's a detailed prompt for the LLM. Modify as per your requirement.

    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo-instruct', openAIApiKey: process.env['OPEN_AI_KEY'] });
    const prompt = PromptTemplate.fromTemplate(
      `CONTEXT: Below is RAW TEXT scraped from a website. This text includes quality content like what the company is doing, what their features are, blog content, etc.  However, there is a lot of text that is irrelevant and not considered quality content, like navigation menu labels, footer information, various metadata, etc.
       INSTRUCTIONS: You need to return only the quality content.
       FORMAT INSTRUCTIONS: Do not change any of the copy you keep, but format it nicely for readability, triming extra white spaces, multiple new lines, etc.
       RAW TEXT:{text}`,
    );
    const chain = new LLMChain({ llm: model, prompt: prompt });

    const res = await chain.run(chunk);
    return res;
  }

  async scrapeContent(page: Page): Promise<Document[]> {
    const fullContent = await page.$eval('body', (body) => body.innerText);
    const doc = new Document({
      pageContent: fullContent,
      metadata: { url: page.url(), title: await page.title() },
    });

    const chunks = this.sourceService.chunkText(doc, 1800, 190);

    const trimmedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        chunk.pageContent = await this.filterContentWithLLM(chunk.pageContent);
        return chunk;
      }),
    );
    return trimmedChunks.filter((chunk) => chunk.pageContent && chunk.pageContent.length > 0);
  }

  async scrapeSingleLink(page: Page, link: string): Promise<Document[] | null> {
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        await page.goto(link, { waitUntil: 'domcontentloaded' });
        const contents: Document[] = await this.scrapeContent(page);
        this.logger.log(`Attempt ${attempt} succeeded for ${link}.`);
        return contents;
      } catch (error) {
        this.logger.warn(`Attempt ${attempt} failed for ${link}. Retrying...`);
        this.logger.error(error);
        if (attempt === this.MAX_RETRIES) {
          this.logger.error(`Failed to scrape ${link} after ${this.MAX_RETRIES} attempts. Skipping...`);
        }
      }
    }
    return null;
  }

  async scrapeWebsite(baseURL: string): Promise<Document[]> {
    const browser = await chromium.connect(`wss://chrome.browserless.io/playwright?token=${process.env.BROWSERLESS_IO_API_KEY}`);
    const context = await browser.newContext();
    const page = await context.newPage();
    const contents: Document[] = [];
    // Convert the set of links to an array and treat it as a queue
    try {
      const linkQueue: string[] = [baseURL];
      const seenLinks: Set<string> = new Set([baseURL]); // track links we've already added to the queue

      while (linkQueue.length) {
        const currentLink = linkQueue.shift(); // Dequeue the first link
        if (!currentLink) continue; // safety check

        const newContents = await this.scrapeSingleLink(page, currentLink);
        if (newContents) {
          contents.push(...newContents);
        }
        // Extract new internal links and add them to the queue if they haven't been seen
        const newLinks = await this.extractInternalLinks(page);
        for (const link of newLinks) {
          if (!seenLinks.has(link)) {
            seenLinks.add(link);
            linkQueue.push(link);
            this.logger.log(`Found another link - ${link}`);
          }
        }
      }

      await browser.close();
    } catch (e) {}
    this.logger.log(`Processed ${contents.length} chunks. Preparing to store in Vector DB.`);
    return contents;
  }
}
