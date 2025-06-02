import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {UserEntity} from "../../user/entities/user.entity";
import {UserRole} from "../../user/enum/user.enum";


export class LoginUserRequestDto {
    @ApiProperty({
        example: 'address@gmail.com',
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        example: 'password',
    })
    @IsString()
    @IsNotEmpty()
    password!: string;
}

export class LoginUserResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty({
        enum: UserRole,
        enumName: 'UserRole',
        example: UserRole.ATHLETE,
    })
    roleType!: UserRole;
}

export class LoginResponseDto {

    @ApiProperty({type: LoginUserResponseDto})
    user!: LoginUserResponseDto;

    @ApiProperty()
    access_token!: string;
}

export const toLoginUserResponseDto = (
    user: UserEntity,
): LoginUserResponseDto => ({
    id: user.id,
    roleType: user.role
});