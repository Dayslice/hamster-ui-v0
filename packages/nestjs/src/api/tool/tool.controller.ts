/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Log, LogEntityService } from 'src/entities/log.entity';
import { Tool, ToolEntityService } from 'src/entities/tool.entity';
import { ToolService } from './tool.service';

@Crud({
  model: {
    type: Tool,
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
@Controller('tool')
export class ToolController {
  constructor(public service: ToolEntityService, private logic: ToolService) {}
}
