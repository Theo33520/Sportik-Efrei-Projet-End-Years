import {
    ClassSerializerInterceptor,
    HttpCode,
    HttpStatus,
    Injectable,
    Post,
    UnauthorizedException,
    UseInterceptors
} from '@nestjs/common';
import {UserEntity} from "../user/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {LoginResponseDto, toLoginUserResponseDto} from "./dto/login.dto";
import {UserService} from "../user/user.service";
import { UserRole } from 'src/user/enum/user.enum';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.userService.filterLogin(email, password);
        if (user != null) {
            return user;
        }
        throw new UnauthorizedException('Invalid login credentials');
    }

    async login(user: UserEntity): Promise<LoginResponseDto> {
        user.isLoggedIn = true;
        await this.userRepository.save(user);
        const payload = {sub: user.id, email: user.email, role: user.role};
        return {
            user: toLoginUserResponseDto(user),
            access_token: this.jwtService.sign(payload)
        }
    }


    async logout(userId: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id: String(userId) })
        if (user) {
            user.isLoggedIn = false;
            await this.userRepository.save(user);
        }
    }
}
