import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import { ClubEntity } from 'src/club/entities/club.entity';
import { ClubService } from 'src/club/club.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ClubEntity])],
  providers: [UserService, ClubService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}