/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User, UserEntityService } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Crud({
  model: {
    type: User,
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
@Controller('user')
export class UserController {
  constructor(public service: UserEntityService, private logic: UserService) {}
}
