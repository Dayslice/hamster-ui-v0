/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { WorkflowEntityService } from 'src/entities/workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(protected entity: WorkflowEntityService) {}
}
