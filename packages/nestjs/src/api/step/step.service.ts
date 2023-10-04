/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { StepEntityService } from 'src/entities/step.entity';

@Injectable()
export class StepService {
  constructor(protected entity: StepEntityService) {}
}
