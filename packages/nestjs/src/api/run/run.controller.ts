/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RunService } from './run.service';
import { Run, RunEntityService } from 'src/entities/run.entity';

@Crud({
  model: {
    type: Run,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    join: {
      workflow: {},
    },
    sort: [
      {
        field: 'created_at',
        order: 'DESC',
      },
    ],
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'createOneBase'],
  },
})
@Controller('run')
export class RunController {
  constructor(public service: RunEntityService, private logic: RunService) {}
}
