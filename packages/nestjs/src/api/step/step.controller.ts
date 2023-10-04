/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Step, StepEntityService } from 'src/entities/step.entity';
import { StepService } from './step.service';

@Crud({
  model: {
    type: Step,
  },
  query: {
    join: {
      primary_agent: {},
      other_agents: {},
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
@Controller('step')
export class StepController {
  constructor(public service: StepEntityService, private logic: StepService) {}
}
