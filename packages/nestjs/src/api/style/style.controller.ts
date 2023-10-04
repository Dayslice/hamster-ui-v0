/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Style, StyleEntityService } from 'src/entities/style.entity';
import { StyleService } from './style.service';

@Crud({
  model: {
    type: Style,
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
@Controller('style')
export class StyleController {
  constructor(public service: StyleEntityService, private logic: StyleService) {}
}
