import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../user-entity/user.entity';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToOne(() => User, (user) => user.circlesOwned)
  owner: User;

  @ManyToMany(() => User, (user) => user.circlesJoined)
  @JoinTable()
  members: User[];
}
