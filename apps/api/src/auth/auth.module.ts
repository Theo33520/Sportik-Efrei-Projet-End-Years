import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {UserModule} from "../user/user.module";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";
import {jwtConstants} from "./constants";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";


@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}