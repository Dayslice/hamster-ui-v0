/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { StepController } from './step.controller';
import { StepService } from './step.service';

@Module({
  imports: [EntitiesModule],
  controllers: [StepController],
  providers: [StepService],
  exports: [StepService],
})
export class StepModule {}
