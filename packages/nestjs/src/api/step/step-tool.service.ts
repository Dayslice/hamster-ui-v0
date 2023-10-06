/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { StepToolEntityService } from 'src/entities/step_tool.entity';

@Injectable()
export class StepToolService {
  constructor(protected entity: StepToolEntityService) {}
}
