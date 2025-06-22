import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controllers } from '../common/controller.enum';
import { TrainingSessionService } from './trainingSession.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingSessionDto } from './dto/TranningSession.dto';
import { TrainingSessionEntity } from './entities/trainingSession.entity';
import { TrainingSummaryDto } from './dto/Training-summary.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { IsLoggedInGuard } from 'src/guards/is-logged-in-guard';

@Controller(Controllers.TRAINING_SESSION)
@ApiTags(Controllers.TRAINING_SESSION)
export class TrainingSessionController {
  constructor(
    private readonly trainingSessionService: TrainingSessionService,
  ) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get()
  async findAll(): Promise<TrainingSessionDto[]> {
    return this.trainingSessionService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('athlete/:userId')
  async findByUserId(
    @Param('userId') userId: string,
  ): Promise<TrainingSessionDto[]> {
    return this.trainingSessionService.findByUserIdAthelete(userId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('coach/:userId')
  async findByUserIdCoach(
    @Param('userId') userId: string,
  ): Promise<TrainingSessionDto[]> {
    return this.trainingSessionService.findByUserIdCoach(userId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('dashboardSummary/:userId')
  @ApiResponse({ type: TrainingSummaryDto })
  async sessionCompletedOnCurrentWeek(
    @Param('userId') userId: string,
  ): Promise<TrainingSummaryDto> {
    return this.trainingSessionService.getTrainingSummaryForCurrentWeek(userId);
  }
}
