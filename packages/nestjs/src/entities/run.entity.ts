import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Workflow } from './workflow.entity';
import { Company } from './company.entity';
import { Log } from './log.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Run extends Base {
  @Column()
  workflow_id: string;

  @ManyToOne(() => Workflow)
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @Column()
  company_id: string;

  @ManyToOne(() => Company, (company) => company.runs)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  version: number;

  @OneToMany(() => Log, (log) => log.run)
  logs: Log[];
}
@Injectable()
export class RunEntityService extends TypeOrmCrudService<Run> {
  constructor(
    @InjectRepository(Run)
    repo: Repository<Run>,
  ) {
    super(repo);
  }
}
