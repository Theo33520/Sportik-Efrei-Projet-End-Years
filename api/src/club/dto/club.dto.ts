import { ApiProperty } from '@nestjs/swagger';
import { toUserDto, UserDto } from 'src/user/dto/userDto';
import { ClubEntity } from '../entities/club.entity';
import { UserEntity } from 'src/generated/typing';



export class ClubDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [String] })
  userId: string[];
}

export const toClubDto = (club: ClubEntity): ClubDto => {
  return {
    name: club.name,
    userId: club.users?.map((user) => user.id) || [],
  };
};
