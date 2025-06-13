import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Entities } from '../../common/entities.enum';

@Entity({ name: Entities.COMPETITION })
export class CompetitionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'competition_users' })
  users: UserEntity[];
}
