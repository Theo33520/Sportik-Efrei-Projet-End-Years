import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Entities } from '../../common/entities.enum';
import { TrainingSessionEntity } from '../../trainingSession/entities/trainingSession.entity';

@Entity({ name: Entities.PROGRAM })
export class ProgramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  coach: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.program)
  athletes: UserEntity[];

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TrainingSessionEntity, (training) => training.program)
  training: TrainingSessionEntity[];
}
