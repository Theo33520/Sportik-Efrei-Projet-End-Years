import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => UserEntity, (user) => user.competitions)
  @JoinTable({ name: 'competition_users' })
  users: UserEntity[];

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'coach_id' })
  coach: UserEntity;
}
