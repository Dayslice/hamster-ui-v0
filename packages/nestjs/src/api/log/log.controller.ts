/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Log, LogEntityService } from 'src/entities/log.entity';
import { LogService } from './log.service';

@Crud({
  model: {
    type: Log,
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
      source_agent: {},
      target_agent: {},
      attachments: {},
    },
    sort: [
      {
        field: 'created_at',
        order: 'ASC',
      },
    ],
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'createOneBase'],
  },
})
@Controller('log')
export class LogController {
  constructor(public service: LogEntityService, private logic: LogService) {}
  // This will automatically bind the CRUD methods to this controller
  get base(): CrudController<Log> {
    return this;
  }

  @Post()
  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @Body() dto: Log) {
    // 'dto' is the POSTed data. Handle or transform it as you wish.
    console.log(dto);
    // If you want to continue with the default behavior after processing the DTO,
    // you can call 'this.base.createOneBase()'.
    return this.base.createOneBase(req, dto);
  }
}
