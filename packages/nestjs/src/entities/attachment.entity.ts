import { Entity, Column, Repository, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Log } from './log.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class Attachment extends Base {
  @Column()
  label: string;

  @Column()
  url: string;

  @Column()
  revision: number;

  @Column()
  log_id: number;

  @ManyToOne(() => Log, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'log_id' })
  log: Log;
}
@Injectable()
export class AttachmentEntityService extends TypeOrmCrudService<Attachment> {
  constructor(
    @InjectRepository(Attachment)
    repo: Repository<Attachment>,
  ) {
    super(repo);
  }
}
