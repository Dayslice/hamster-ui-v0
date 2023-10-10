import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Agent } from './agent.entity';
import { Workflow } from './workflow.entity';
import { Style } from './style.entity';
import { Run } from './run.entity';
import { User } from './user.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Company extends Base {
  @Column()
  label: string;

  @Column()
  business_goals: string;

  @Column()
  description: string;

  @Column({ type: 'jsonb' })
  metadata: Record<string, any>;

  @Column()
  url: string;

  @Column()
  elevator_pitch: string;

  @Column()
  communication_style_id: string;

  @Column({ default: '' })
  logo_url: string;

  @ManyToOne(() => Style)
  @JoinColumn({ name: 'communication_style_id' })
  communication_style: Style;

  @OneToMany(() => Run, (run) => run.company)
  runs: Run[];

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
@Injectable()
export class CompanyEntityService extends TypeOrmCrudService<Company> {
  constructor(
    @InjectRepository(Company)
    repo: Repository<Company>,
  ) {
    super(repo);
  }
}
