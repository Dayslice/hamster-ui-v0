import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, DeepPartial, DeleteDateColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Step } from './step.entity';
import { Tool } from './tool.entity';

@Entity()
export class StepTool extends Base {
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @Column()
  tool_id: string;

  @Column()
  step_id: string;

  @ManyToOne(() => Step, (step) => step.step_tools, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'step_id' })
  step: Step;

  @ManyToOne(() => Tool, (tool) => tool.step_tools, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;

  @Column('jsonb')
  config: Record<string, any>;

  @Column({ default: 0 })
  order: number;

  @ManyToMany(() => StepTool, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'step_tool_inputs', // Name of the join table
    joinColumn: {
      name: 'step_tool_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'step_tool_input_id',
      referencedColumnName: 'id',
    },
  })
  step_tool_inputs: StepTool[];
}
@Injectable()
export class StepToolEntityService extends TypeOrmCrudService<StepTool> {
  constructor(
    @InjectRepository(StepTool)
    repo: Repository<StepTool>,
  ) {
    super(repo);
  }

  async save(entity: DeepPartial<StepTool>) {
    return this.repo.save(entity);
  }
}
