import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {toUserDto, UserDto} from "./dto/userDto";
import {toUserProfilDto, UserProfileDto} from "./dto/user-profilDto";
import * as bcrypt from 'bcrypt';
import { UserRole } from './enum/user.enum';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import {jwtConstants} from "../auth/constants";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => toUserDto(user));
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
      relations: ['club']
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return toUserDto(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async filterLogin(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async findByIdToProfilSession(id: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return toUserProfilDto(user);
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const isExisting = await this.userRepository.findOne({
      where: { email: String(data.email) },
    });
    if (isExisting) {
      throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.save(data);
  }
  async updateUserToProfil(
    id: string,
    dto: Partial<UserEntity>,
  ): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(user, dto);
    await this.userRepository.save(user);
    return toUserProfilDto(user);
  }

  async getRoleUser(id: string): Promise<{ role: UserRole }> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
    });
    return { role: user.role };
  }
}