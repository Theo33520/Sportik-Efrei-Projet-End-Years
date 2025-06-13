import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ClubEntity } from './club/entities/club.entity';
import { ProgramEntity } from './program/entities/program.entity';
import { CompetitionEntity } from './competition/entities/competition.entity';
import { NotificationEntity } from './notification/entities/notification.entity';
import { ProgramController } from './program/program.controller';
import { CompetionController } from './competition/competion.controller';
import { NotificationController } from './notification/notification.controller';
import { ClubController } from './club/club.controller';
import { ClubService } from './club/club.service';
import { NotificationService } from './notification/notification.service';
import { ProgramService } from './program/program.service';
import { CompetitionService } from './competition/competition.service';
import { CompetitionModule } from './competition/competition.module';
import { ProgramModule } from './program/program.module';
import { NotificationModule } from './notification/notification.module';
import { ClubModule } from './club/club.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseSeederService } from './seeder/user.seeder';
import * as dotenv from 'dotenv';
import { NotificationSeederService } from './seeder/notification.seeder';
import { TrainingSessionEntity } from './trainingSession/entities/trainingSession.entity';
import { TrainingSessionController } from './trainingSession/trainingSession.controller';
import { TrainingSessionService } from './trainingSession/trainingSession.service';
import { ProgramSeederService } from './seeder/program.seeder';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: parseInt(process.env.PORT_DB),
      username: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      synchronize: true,
      entities: [
        UserEntity,
        ClubEntity,
        ProgramEntity,
        NotificationEntity,
        CompetitionEntity,
        TrainingSessionEntity,
      ],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      ClubEntity,
      ProgramEntity,
      NotificationEntity,
      CompetitionEntity,
      TrainingSessionEntity,
    ]),
    CompetitionModule,
    ProgramModule,
    NotificationModule,
    ClubModule,
    UserModule,
    AuthModule,
    TrainingSessionEntity,
  ],
  controllers: [
    AppController,
    UserController,
    ProgramController,
    CompetionController,
    NotificationController,
    ClubController,
    AuthController,
    TrainingSessionController,
  ],
  providers: [
    AppService,
    UserService,
    ClubService,
    NotificationService,
    ProgramService,
    TrainingSessionService,
    CompetitionService,
    AuthService,
    DatabaseSeederService,
    NotificationSeederService,
    ProgramSeederService,
  ],
})
export class AppModule {}
