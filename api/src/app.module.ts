import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user/entities/user.entity";
import {UserService} from "./user/user.service";
import {UserController} from "./user/user.controller";
import {ClubEntity} from "./club/entities/club.entity";
import {PerformanceRapportEntity} from "./performance-rapport/entities/performance-rapport";
import {ProgramEntity} from "./program/entities/program.entity";
import {CompetitionEntity} from "./competition/entities/competition.entity";
import {PerformanceEntity} from "./performance/entities/performance.entity";
import {NotificationEntity} from "./notification/entities/notification.entity";
import { ProgramController } from './program/program.controller';
import { CompetionController } from './competition/competion.controller';
import { NotificationController } from './notification/notification.controller';
import { PerformanceController } from './performance/performance.controller';
import { PerformanceRapportController } from './performance-rapport/performance-rapport.controller';
import { ClubController } from './club/club.controller';
import { ClubService } from './club/club.service';
import { PerformanceRapportService } from './performance-rapport/performance-rapport.service';
import { NotificationService } from './notification/notification.service';
import { ProgramService } from './program/program.service';
import { PerformanceService } from './performance/performance.service';
import { CompetitionService } from './competition/competition.service';
import { CompetitionModule } from './competition/competition.module';
import { PerformanceModule } from './performance/performance.module';
import { ProgramModule } from './program/program.module';
import { PerformanceRapportModule } from './performance-rapport/performance-rapport.module';
import { NotificationModule } from './notification/notification.module';
import { ClubModule } from './club/club.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import {DatabaseSeederService} from "./seeder/user.seeder"
import * as dotenv from 'dotenv';
import {NotificationSeederService} from "./seeder/notification.seeder";
import {PerformanceSeederService} from "./seeder/performance.seeder";
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    port: parseInt(process.env.PORT_DB),
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    synchronize: true,
    entities : [UserEntity, ClubEntity, PerformanceEntity, PerformanceRapportEntity, ProgramEntity, NotificationEntity, CompetitionEntity],
  }),
    TypeOrmModule.forFeature([UserEntity, ClubEntity, PerformanceEntity, PerformanceRapportEntity, ProgramEntity, NotificationEntity, CompetitionEntity]),
    CompetitionModule,
    PerformanceModule,
    ProgramModule,
    PerformanceRapportModule,
    NotificationModule,
    ClubModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController, UserController, ProgramController, CompetionController, NotificationController, PerformanceController, PerformanceRapportController, ClubController, AuthController],
  providers: [AppService, UserService, ClubService, PerformanceRapportService, NotificationService, ProgramService, PerformanceService, CompetitionService, AuthService, DatabaseSeederService, NotificationSeederService, PerformanceSeederService],
})
export class AppModule {}
