import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { Entities } from '../../common/entities.enum';
import { PerformanceUnit } from '../enum/unit.perf.enum';

@Entity({ name: Entities.PERFORMANCE })
export class PerformanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column('float')
  value: number;

  @Column({ type: 'enum', enum: PerformanceUnit })
  unit: PerformanceUnit;

  @ManyToOne(() => UserEntity, (user) => user.performance)
  user: UserEntity;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
