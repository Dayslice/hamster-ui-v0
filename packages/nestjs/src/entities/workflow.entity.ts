import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Agent } from './agent.entity';
import { Step } from './step.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Workflow extends Base {
  @Column()
  label: string;

  @Column()
  description: string;

  @OneToMany(() => Step, (step) => step.workflow)
  steps: Step[];
}
@Injectable()
export class WorkflowEntityService extends TypeOrmCrudService<Workflow> {
  constructor(
    @InjectRepository(Workflow)
    repo: Repository<Workflow>,
  ) {
    super(repo);
  }
}
