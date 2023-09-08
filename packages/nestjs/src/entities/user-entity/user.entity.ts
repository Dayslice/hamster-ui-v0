import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Circle } from '../circle-entity/circle.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  googleId: string;

  @Column()
  pictureUrl: string;

  @OneToMany(() => Circle, (circle) => circle.owner)
  circlesOwned: Circle[];

  @ManyToMany(() => Circle, (circle) => circle.members)
  @JoinTable()
  circlesJoined: Circle[];
}
