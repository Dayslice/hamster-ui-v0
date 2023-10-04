/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Agent, AgentEntityService } from 'src/entities/agent.entity';
import { AgentService } from './agent.service';

@Crud({
  model: {
    type: Agent,
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
@Controller('agent')
export class AgentController {
  constructor(public service: AgentEntityService, private logic: AgentService) {}
}
