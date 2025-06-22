import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
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
import { AthleteCategory } from '../enum/atheleteCategory.enum';
import { CompetitionEntity } from 'src/competition/entities/competition.entity';

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
  phoneNumber?: string;

  @Column({ nullable: true })
  Age?: number;

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: AthleteCategory,
    default: AthleteCategory.CADET,
    nullable: true,
  })
  category?: AthleteCategory;

  @Column({ nullable: true })
  profilePicture?: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => ClubEntity, (club) => club.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'clubId' })
  club: ClubEntity;

  @Column({ nullable: true })
  clubId: string;

  @ManyToOne(() => ProgramEntity, (program) => program.athletes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  program: ProgramEntity;

  @Column({ nullable: true })
  programId: string;

  @OneToMany(
    () => NotificationEntity,
    (notification) => notification.receiver,
    { nullable: true },
  )
  notifications: NotificationEntity[];

  @Column({ default: false, nullable: true })
  isLoggedIn: boolean;

  @ManyToMany(() => CompetitionEntity, (competition) => competition.users)
  competitions: CompetitionEntity[];

  @OneToMany(() => CompetitionEntity, (competition) => competition.coach)
  competitionsAsCoach: CompetitionEntity[];
}
