import { IsString, IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
import { ProgramEntity } from '../entities/program.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTrainingSessionDto } from 'src/trainingSession/dto/CreateTrainningSession.dto';
import { TrainingSessionDto } from 'src/trainingSession/dto/TranningSession.dto';
import { TrainingDto } from 'src/trainingSession/dto/Tranning.dto';
import { UserDto } from 'src/user/dto/userDto';

export class ProgramDto {

  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  coachId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  countAthletes?: number;

  @ApiProperty({ type: [TrainingDto] })
  trainings?: TrainingDto[];
  
  @ApiProperty()
  athleteId?: string[];
}

export const toProgramDto = (entity: ProgramEntity): ProgramDto => ({
  id: entity.id,
  coachId: entity.coach?.id,
  title: entity.title,
  description: entity.description,
  countAthletes: entity.athletes?.length || 0,
  trainings:
  entity.training?.map((training) => ({
    name: training?.name,
    description: training.description,
    startDate: training.startDate,
    endDate: training.endDate,
  })) || [],
  athleteId: entity.athletes?.map((athlete) => athlete.id) || [],
});