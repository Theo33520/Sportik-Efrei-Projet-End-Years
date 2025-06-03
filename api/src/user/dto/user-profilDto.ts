import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {UserEntity} from "../entities/user.entity";

export class UserProfileDto {

    @ApiProperty()
    user_id: string;

    @ApiProperty()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    isLoggedIn: boolean;

    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    role: string;
}


export const toUserProfilDto = (user: UserEntity): UserProfileDto => ({
    user_id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    isLoggedIn: user.isLoggedIn,
    email: user.email,
    role: user.role,
});
