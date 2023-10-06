/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Step, StepEntityService } from 'src/entities/step.entity';
import { StepService } from './step.service';
import { StepTool, StepToolEntityService } from 'src/entities/step_tool.entity';

@Crud({
  model: {
    type: StepTool,
  },
  query: {
    join: {
      step_tool_inputs: {},
      tool: {},
    },
    sort: [
      {
        field: 'order',
        order: 'ASC',
      },
    ],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'createOneBase'],
  },
})
@Controller('step-tool')
export class StepToolController {
  constructor(public service: StepToolEntityService, private logic: StepService) {}
}
