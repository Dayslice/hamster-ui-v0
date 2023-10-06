import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Agent } from './agent.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { StepTool } from './step_tool.entity';

@Entity()
export class Tool extends Base {
  @Column()
  label: string;

  @Column()
  description: string;

  @Column({ default: '' })
  api_token: string;

  @Column({ unique: true })
  ref: string;

  @Column({ type: 'jsonb', nullable: true })
  output_model: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  config: Record<string, any>;

  @ManyToMany(() => Agent, (agent) => agent.tools)
  agents: Agent[];

  @OneToMany(() => StepTool, (step_tool) => step_tool.tool)
  step_tools: StepTool[];
}
@Injectable()
export class ToolEntityService extends TypeOrmCrudService<Tool> {
  constructor(
    @InjectRepository(Tool)
    repo: Repository<Tool>,
  ) {
    super(repo);
  }
}
