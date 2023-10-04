/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { StyleController } from './style.controller';
import { StyleService } from './style.service';
@Module({
  imports: [EntitiesModule],
  controllers: [StyleController],
  providers: [StyleService],
  exports: [StyleService],
})
export class StyleModule {}
