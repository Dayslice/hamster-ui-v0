import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user-entity/user.entity';
import { Circle } from './circle-entity/circle.entity';
import { CircleEntityService } from './circle-entity/circle-entity.service';
import { UserEntityService } from './user-entity/user-entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Circle])],
  providers: [CircleEntityService, UserEntityService],
  exports: [CircleEntityService, UserEntityService],
})
export class EntitiesModule {}
