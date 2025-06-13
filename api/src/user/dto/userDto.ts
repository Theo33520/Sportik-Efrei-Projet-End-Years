import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {UserEntity} from "../entities/user.entity";


export class UserDto {
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
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  clubName: string;

}

export const toUserDto = (user: UserEntity): UserDto => ({
    user_id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    isLoggedIn: user.isLoggedIn,
    email: user.email,
    clubName: user.club ? user.club.name : null,
});
