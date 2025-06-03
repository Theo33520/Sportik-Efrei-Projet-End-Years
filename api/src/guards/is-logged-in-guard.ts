// is-logged-in.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('User does not authorized');
        }

        const fullUser = await this.userService.findById(user.id);
        if (!fullUser?.isLoggedIn) {
            throw new UnauthorizedException('User is disconnected or not logged in');
        }
        return true;
    }
}
