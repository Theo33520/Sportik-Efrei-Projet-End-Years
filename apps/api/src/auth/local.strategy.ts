import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "../user/enum/user.enum";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<UserEntity> {
        return this.authService.validateUser(email, password);
    }
}
