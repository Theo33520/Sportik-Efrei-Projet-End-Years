import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClubService } from './club.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { IsLoggedInGuard } from 'src/guards/is-logged-in-guard';
import { UserDto } from 'src/generated/typing';
import { Controllers } from 'src/common/controller.enum';
import { Entities } from 'src/common/entities.enum';

@Controller(Controllers.CLUB)
@ApiTags(Entities.CLUB)
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':coachId/athletes')
  @ApiOperation({ operationId: 'Get athletes by coach ID' })
  async getAthletesByCoachId(
    @Param('coachId') coachId: string,
  ): Promise<UserDto[]> {
    return this.clubService.findAthleteByCoach(coachId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':clubId/coaches')
  @ApiOperation({ operationId: 'Get coaches by club ID' })
  async getCoachesByClubId(
    @Param('clubId') clubId: string,
  ): Promise<UserDto[]> {
    return this.clubService.listCoachesByClub(clubId);
  }
}
