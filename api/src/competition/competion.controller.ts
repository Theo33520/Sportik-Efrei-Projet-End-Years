import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controllers } from 'src/common/controller.enum';
import { CompetitionService } from './competition.service';
import { CompetitionDto } from './dto/competitions.dto';
import { IsLoggedInGuard } from 'src/guards/is-logged-in-guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { CompetitionEntity } from './entities/competition.entity';

@Controller(Controllers.COMPETITION)
@ApiTags(Controllers.COMPETITION)
export class CompetionController {
  constructor(private readonly competitionService: CompetitionService) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get()
  @ApiOperation({ operationId: 'Get all competitions' })
  @ApiOkResponse({
    description: 'Returns a list of all competitions',
    type: [CompetitionDto],
  })
  async findAll(): Promise<CompetitionDto[]> {
    return this.competitionService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('user/:userId')
  @ApiOperation({ operationId: 'Get competitions by user ID' })
  @ApiOkResponse({
    description: 'Returns a list of competitions for a specific user',
    type: [CompetitionDto],
  })
  async findByUserId(
    @Param('userId') userId: string,
  ): Promise<CompetitionDto[]> {
    return this.competitionService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Post('/create')
  @ApiOperation({ operationId: 'Create a new competition' })
  @ApiOkResponse({
    description: 'Returns the created competition',
    type: CompetitionDto,
  })
  async create(
    @Body() competitionData: Partial<CompetitionEntity>,
  ): Promise<CompetitionDto> {
    return this.competitionService.create(competitionData);
  }

    @Post('/delete/:id')
    @ApiOperation({ operationId: 'Delete a competition by ID' })
    @ApiOkResponse({
      description: 'Deletes a competition by ID',
    })
    async delete(@Param('id') id: string): Promise<void> {
        return this.competitionService.delete(id);
    }
}