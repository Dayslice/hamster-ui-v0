import { Entity, Column, Repository, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Run } from './run.entity';
import { Agent } from './agent.entity';
import { Attachment } from './attachment.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Log extends Base {
  @Column({
    type: 'enum',
    enum: ['output', 'chat', 'tool', 'task'],
    default: 'output',
  })
  type: string;

  @Column()
  content: string;

  @OneToMany(() => Attachment, (attachment) => attachment.log)
  attachments: Attachment[];

  @Column()
  run_id: string;

  @ManyToOne(() => Run, (run) => run.logs)
  @JoinColumn({ name: 'run_id' })
  run: Run;

  @Column({ nullable: true })
  source_agent_id: string;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'source_agent_id' })
  source_agent: Agent;

  @Column({ nullable: true })
  target_agent_id: string;

  @ManyToOne(() => Agent, { nullable: true })
  @JoinColumn({ name: 'target_agent_id' })
  target_agent: Agent;
}
@Injectable()
export class LogEntityService extends TypeOrmCrudService<Log> {
  constructor(
    @InjectRepository(Log)
    repo: Repository<Log>,
  ) {
    super(repo);
  }
}
