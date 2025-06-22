import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Entities } from '../../common/entities.enum';
import { ProgramEntity } from '../../program/entities/program.entity';

@Entity({ name: Entities.TRAINING_SESSION })
export class TrainingSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProgramEntity, (program) => program.training)
  program: ProgramEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;
}
