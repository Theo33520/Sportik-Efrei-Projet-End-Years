import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enum/user.enum';

export class UserRoleDto {
  @ApiProperty({ enum: UserRole, description: 'User role' })
  role: UserRole;
}

export class UserCategoryDto {
  @ApiProperty({ enum: UserRole, description: 'User category' })
  athleteCategory: string;
}