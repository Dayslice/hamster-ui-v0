import { Entity, Column, Repository, ManyToOne, JoinColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from './base.entity';
import { Company } from './company.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  google_id: string;

  @Column()
  picture_url: string;

  @Column()
  company_id: string;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
@Injectable()
export class UserEntityService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    repo: Repository<User>,
  ) {
    super(repo);
  }
}
