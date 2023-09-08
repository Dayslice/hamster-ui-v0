import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserResponse } from 'common/types/user.type';
@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  test(): UserResponse {
    return {
      name: 'df',
    };
  }
  // CRUD operations like create, find, update, delete, etc.
}
