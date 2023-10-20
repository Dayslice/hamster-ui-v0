/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Document } from 'langchain/document';
import { Source, SourceEntityService } from 'src/entities/source.entity';

import { v4 as uuidv4 } from 'uuid';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
@Injectable()
export class SourceService {
  constructor(protected entity: SourceEntityService) {}

  async dumpPDFtoSource(file: Express.Multer.File, company_id: string): Promise<Source[]> {
    const blob: Blob = new Blob([file.buffer]);
    const loader = new PDFLoader(blob, { splitPages: false });
    let docs = await loader.load();
    if (docs.length > 1 || docs[0].pageContent.length > 2000) {
      // Just assuming docs is an array of texts here.
      // Modify this according to the actual structure.
      docs = this.chunkText(docs[0], 3000, 120);
    }

    /* Create instance */
    const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env['OPEN_AI_KEY'] });
    const embeddedDocs = await embeddings.embedDocuments(docs.map((doc) => doc.pageContent));
    const uuid = uuidv4();
    const sources = [];
    const slug = file.originalname.split('.')[0];

    for (let i = 0; i < docs.length; i++) {
      sources.push({
        metadata: { ...docs[i].metadata },
        embeddings: `[${embeddedDocs[i].join(',')}]`, // Use the loop index to access the corresponding embeddedDoc
        content: docs[i].pageContent.replace(/\0/g, ''),
        contentUrl: file.originalname,
        company_id: company_id,
        group_id: uuid,
        slug: `${slug}-${i}`,
      });
    }

    const createdSources = await this.entity.addMany(sources);
    return createdSources;
  }

  async createFromText(partial: Partial<Source>): Promise<Source> {
    /* Create instance */
    const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env['OPEN_AI_KEY'] });
    const embeddedDoc = await embeddings.embedDocuments([partial.content]);
    const uuid = uuidv4();

    partial.metadata = { text: true };
    partial.embeddings = `[${embeddedDoc.join(',')}]`;
    partial.group_id = uuid;
    return await this.entity.addOne(partial);
  }

  chunkText(document: Document<Record<string, any>>, chunkSize: number, threshold: number): Document<Record<string, any>>[] {
    const chunks: Document<Record<string, any>>[] = [];
    let currentIndex = 0;
    const text = document.pageContent;

    while (currentIndex < text.length) {
      let endIndex = currentIndex + chunkSize;

      // Ensure we're not exceeding the string length
      if (endIndex >= text.length) {
        endIndex = text.length - 1;
      }

      // If we're inside a sentence, extend to the end of the sentence.
      if (text[endIndex] !== '.' && text[endIndex] !== '\n') {
        const originalEndIndex = endIndex;
        while (endIndex < text.length && text[endIndex] !== '.' && endIndex - originalEndIndex <= threshold) {
          endIndex++;
        }
        // If we didn't find a period, revert to original endIndex
        if (endIndex >= text.length || text[endIndex] !== '.') {
          endIndex = originalEndIndex;
        }
      }

      // If we're close to a paragraph end (within threshold), extend to the end of the paragraph.
      const nextNewLine = text.indexOf('\n', endIndex);
      if (nextNewLine !== -1 && nextNewLine - endIndex <= threshold) {
        endIndex = nextNewLine;
      }

      // Push the chunk and update currentIndex
      const chunkContent = text.substring(currentIndex, endIndex + 1).trim();
      if (chunkContent) {
        chunks.push(new Document({ metadata: document.metadata, pageContent: chunkContent }));
      }
      currentIndex = endIndex + 1; // Move past the period or newline character
    }

    return chunks;
  }

  async summarizeSearch(query: string, content: string[]): Promise<string> {
    // We can construct an LLMChain from a PromptTemplate and an LLM.
    const model = new OpenAI({ temperature: 0, openAIApiKey: process.env['OPEN_AI_KEY'] });
    const prompt = PromptTemplate.fromTemplate(
      `Based ONLY on the following SOURCES of information, summarize an answer to the QUERY. SOURCES: ${content.join(
        '\n\n',
      )}.  Query: {query}?`,
    );
    const chainA = new LLMChain({ llm: model, prompt });
    const res = await chainA.call({ query });
    return res.text;
  }
}
