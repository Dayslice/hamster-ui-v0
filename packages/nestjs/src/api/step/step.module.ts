/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { StepController } from './step.controller';
import { StepService } from './step.service';
import { StepToolController } from './step-tool.controller';
import { StepToolService } from './step-tool.service';

@Module({
  imports: [EntitiesModule],
  controllers: [StepController, StepToolController],
  providers: [StepService, StepToolService],
  exports: [StepService, StepToolService],
})
export class StepModule {}
