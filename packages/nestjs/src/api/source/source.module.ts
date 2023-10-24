/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { SourceController } from './source.controller';
import { SourceService } from './source.service';
import { ScraperService } from './scraper.service';

@Module({
  imports: [EntitiesModule],
  controllers: [SourceController],
  providers: [SourceService, ScraperService],
  exports: [SourceService],
})
export class SourceModule {}
