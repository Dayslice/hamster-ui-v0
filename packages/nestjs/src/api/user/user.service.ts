/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserEntityService } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(protected entity: UserEntityService) {}
}
