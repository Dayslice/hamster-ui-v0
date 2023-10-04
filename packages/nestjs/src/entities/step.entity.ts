import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Agent } from './agent.entity';
import { Workflow } from './workflow.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Step extends Base {
  @Column()
  label: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'primary_agent_id' })
  primary_agent: Agent;

  @Column()
  primary_agent_id: string;

  @Column()
  workflow_id: string;

  @ManyToOne(() => Workflow)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @ManyToMany(() => Agent)
  @JoinTable({
    name: 'step_other_agents', // Name of the join table
    joinColumn: {
      name: 'step_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'agent_id',
      referencedColumnName: 'id',
    },
  })
  other_agents: Agent[];
}
@Injectable()
export class StepEntityService extends TypeOrmCrudService<Step> {
  constructor(
    @InjectRepository(Step)
    repo: Repository<Step>,
  ) {
    super(repo);
  }
}
