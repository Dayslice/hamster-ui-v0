/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Workflow, WorkflowEntityService } from 'src/entities/workflow.entity';
import { WorkflowService } from './workflow.service';

@Crud({
  model: {
    type: Workflow,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase'],
  },
})
@Controller('workflow')
export class WorkflowController {
  constructor(public service: WorkflowEntityService, private logic: WorkflowService) {}
}
