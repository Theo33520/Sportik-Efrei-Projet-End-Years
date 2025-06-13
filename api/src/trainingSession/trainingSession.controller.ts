import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Controllers } from '../common/controller.enum';
import { TrainingSessionService } from './trainingSession.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingSessionDto } from './dto/TranningSession.dto';
import { TrainingSessionEntity } from './entities/trainingSession.entity';
import { TrainingSummaryDto } from './dto/Training-summary.dto';

@Controller(Controllers.TRAINING_SESSION)
@ApiTags(Controllers.TRAINING_SESSION)
export class TrainingSessionController {
  constructor(
    private readonly trainingSessionService: TrainingSessionService,
  ) {}

  @Get()
  async findAll(): Promise<TrainingSessionDto[]> {
    return this.trainingSessionService.findAll();
  }

  @Get('athlete/:userId')
  async findByUserId(
    @Param('userId') userId: string,
  ): Promise<TrainingSessionDto[]> {
    return this.trainingSessionService.findByUserIdAthelete(userId);
  }

  @Get('coach/:userId')
  async findByUserIdCoach(
    @Param('userId') userId: string,
  ): Promise<TrainingSessionDto[]> {
    return this.trainingSessionService.findByUserIdCoach(userId);
  }

  @Get('dashboardSummary/:userId')
  @ApiResponse({ type: TrainingSummaryDto })
  async sessionCompletedOnCurrentWeek(
    @Param('userId') userId: string,
  ): Promise<TrainingSummaryDto> {
    return this.trainingSessionService.getTrainingSummaryForCurrentWeek(userId);
  }
}
