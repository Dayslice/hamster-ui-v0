/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { SourceController } from './source.controller';
import { SourceService } from './source.service';

@Module({
  imports: [EntitiesModule],
  controllers: [SourceController],
  providers: [SourceService],
  exports: [SourceService],
})
export class SourceModule {}
