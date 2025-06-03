import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum/user.enum';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ClubEntity } from '../../club/entities/club.entity';
import { PerformanceEntity } from '../../performance/entities/performance.entity';
import { ProgramEntity } from '../../program/entities/program.entity';
import { NotificationEntity } from '../../notification/entities/notification.entity';
import { PerformanceRapportEntity } from '../../performance-rapport/entities/performance-rapport';
import { Entities } from '../../common/entities.enum';
import { ApiTags } from '@nestjs/swagger';

@Entity({ name: Entities.USER })
@ApiTags(Entities.USER)
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Length(2, 255)
  @Column('varchar', { length: 255 })
  lastname: string;

  @IsNotEmpty()
  @Length(2, 255)
  @Column('varchar', { length: 255 })
  firstname: string;

  @IsEmail()
  @Column('varchar', { length: 255 })
  email: string;

  @Exclude()
  @Column('varchar', { length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ATHLETE,
  })
  role: UserRole;

  @Column({ nullable: true })
  profilePicture?: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ default: false })
  isEmailVerified: boolean;

  @ManyToOne(() => ClubEntity, (club) => club.users, { nullable: true })
  club: ClubEntity;

  @OneToMany(() => PerformanceEntity, (performance) => performance.user, {
    nullable: true,
  })
  performance: PerformanceEntity[];

  @OneToMany(() => ProgramEntity, (program) => program.user, { nullable: true })
  program: ProgramEntity[];

  @OneToMany(
    () => NotificationEntity,
    (notification) => notification.receiver,
    { nullable: true },
  )
  notifications: NotificationEntity[];

  @OneToMany(
    () => PerformanceRapportEntity,
    (performanceRapport) => performanceRapport.athlete,
    { nullable: true },
  )
  performanceRapport: PerformanceRapportEntity[];

  @Column({ default: false, nullable: true })
  isLoggedIn: boolean;
}
