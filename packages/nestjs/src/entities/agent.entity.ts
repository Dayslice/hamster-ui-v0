import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Tool } from './tool.entity';
import { Style } from './style.entity';
import { Step } from './step.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Agent extends Base {
  @Column()
  name: string;

  @Column('text', { array: true })
  expertise: string[];

  @Column()
  title: string;

  @Column()
  avatar_url: string;
  @ManyToMany(() => Tool, (tool) => tool.agents)
  @JoinTable({
    name: 'agent_tools', // Name of the join table
    joinColumn: {
      name: 'agent_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tool_id',
      referencedColumnName: 'id',
    },
  })
  tools: Tool[];

  @Column({ nullable: true })
  background_short: string;

  @Column({ nullable: true })
  background_long: string;

  @Column({ nullable: true })
  style_id: number;

  @ManyToOne(() => Style)
  @JoinColumn({ name: 'style_id' })
  communication_style: Style;

  @OneToMany(() => Step, (step) => step.primary_agent)
  primary_steps: Step[];

  @ManyToMany(() => Step, (step) => step.other_agents)
  other_agent_steps: Step[];
}
@Injectable()
export class AgentEntityService extends TypeOrmCrudService<Agent> {
  constructor(
    @InjectRepository(Agent)
    repo: Repository<Agent>,
  ) {
    super(repo);
  }
}
