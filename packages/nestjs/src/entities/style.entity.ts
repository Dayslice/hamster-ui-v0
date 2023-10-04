import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Style extends Base {
  @Column()
  label: string;

  @Column()
  description: string;

  @Column({ default: '' })
  example: string;
}
@Injectable()
export class StyleEntityService extends TypeOrmCrudService<Style> {
  constructor(
    @InjectRepository(Style)
    repo: Repository<Style>,
  ) {
    super(repo);
  }
}
