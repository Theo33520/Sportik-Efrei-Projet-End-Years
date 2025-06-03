import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req, UnauthorizedException, UseGuards,
    UseInterceptors,
    Request, Res
} from '@nestjs/common';
import {Controllers} from "../common/controller.enum";
import {AuthService} from "./auth.service";
import {ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "../guards/jwt-auth-guard";
import { Response } from 'express';
import {LoginResponseDto, LoginUserRequestDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller(Controllers.AUTH)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(Controllers.AUTH)
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    @Post('log-in')
    async logIn(@Request() req: any): Promise<LoginResponseDto> {
        return this.authService.login(req.user);
    }

    @Post('log-out')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async logout(
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ): Promise<{ message: string }> {
        await this.authService.logout(req.user.id);
        return { message: 'Logout successful' };
    }
}