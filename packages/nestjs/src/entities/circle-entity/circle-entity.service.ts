import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Circle } from './circle.entity';

@Injectable()
export class CircleEntityService {
  constructor(
    @InjectRepository(Circle)
    private circleRepository: Repository<Circle>,
  ) {}

  // CRUD operations like create, find, update, delete, etc.
}
