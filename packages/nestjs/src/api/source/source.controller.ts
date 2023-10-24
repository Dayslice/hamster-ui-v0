/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Source, SourceEntityService } from 'src/entities/source.entity';
import { SourceService } from './source.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/dist/document';
import { LatexTextSplitter } from 'langchain/text_splitter';
import { ScraperService } from './scraper.service';

@Crud({
  model: {
    type: Source,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getManyBase', 'deleteOneBase'],
  },
})
@Controller('source')
export class SourceController {
  constructor(public service: SourceEntityService, private logic: SourceService, private scraperService: ScraperService) {}

  @Post(':company_id/create-from-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async createSourceFromPDF(@UploadedFile() file: Express.Multer.File, @Param('company_id') company_id: string): Promise<Source[]> {
    // Step 1: Load PDF into langchain Documents.
    return this.logic.dumpPDFtoSource(file, company_id);
  }

  @Post(':company_id/create-from-text')
  async createSourceFromText(@Body() dto: Partial<Source>, @Param('company_id') company_id: string): Promise<Source> {
    // Step 1: Load PDF into langchain Documents.
    return this.logic.createFromText({
      ...dto,
      company_id: company_id,
    });
  }

  @Get(':company_id/lookup')
  async lookupSource(
    @Param('company_id') company_id: string,
    @Query('q') query: string,
    @Query('closest_neighbors') closest_neighbors = '10',
    @Query('closeness') closeness = '0.2',
  ) {
    if (!query) {
      throw new BadRequestException('Query parameter q is required.');
    }

    const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env['OPEN_AI_KEY'] });
    const embeddedQuery = await embeddings.embedQuery(query);
    const embeddString = `[${embeddedQuery.join(',')}]`;
    return this.service.findClosestEmbeddings(company_id, embeddString, closeness, closest_neighbors);
  }

  @Get(':company_id/query')
  async querySource(
    @Param('company_id') company_id: string,
    @Query('q') query: string,
    @Query('temperature') temperature = '0.0',
    @Query('closest_neighbors') closest_neighbors = '10',
    @Query('closeness') closeness = '0.2',
  ) {
    if (!query) {
      throw new BadRequestException('Query parameter q is required.');
    }

    const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env['OPEN_AI_KEY'] });
    const embeddedQuery = await embeddings.embedQuery(query);
    const embeddString = `[${embeddedQuery.join(',')}]`;
    const results = this.service.findClosestEmbeddings(company_id, embeddString, closeness, closest_neighbors);
    return this.logic.summarizeSearch(
      query,
      (await results).map((res) => `${res.content} (${res.contentUrl})`),
      temperature,
    );
  }

  @Post(':company_id/scrape')
  async scrapeWebsite(@Param('company_id') company_id: string, @Body() body): Promise<Source[]> {
    const { url } = body;
    const docs: Document[] = await this.scraperService.scrapeWebsite(url);
    return await this.logic.addWebSources(docs, company_id);
  }
}
