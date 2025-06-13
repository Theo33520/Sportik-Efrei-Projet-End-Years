import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum/user.enum';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ClubEntity } from '../../club/entities/club.entity';
import { ProgramEntity } from '../../program/entities/program.entity';
import { NotificationEntity } from '../../notification/entities/notification.entity';
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

  @ManyToOne(() => ClubEntity, (club) => club.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'clubId' })
  club: ClubEntity;

  @Column({ nullable: true })
  clubId: string;

  @ManyToOne(() => ClubEntity, (club) => club.coaches, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'coachClubId' })
  coachClub: ClubEntity;

  @Column({ nullable: true })
  coachClubId: string;

  @OneToMany(() => ProgramEntity, (program) => program.user, { nullable: true })
  program: ProgramEntity[];

  @OneToMany(
    () => NotificationEntity,
    (notification) => notification.receiver,
    { nullable: true },
  )
  notifications: NotificationEntity[];

  @Column({ default: false, nullable: true })
  isLoggedIn: boolean;
}
