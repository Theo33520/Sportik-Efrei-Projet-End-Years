import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsInt, IsOptional } from 'class-validator';
import { TrainingSessionEntity } from '../entities/trainingSession.entity';
import { ProgramDto, toProgramDto } from '../../program/dto/program.dto';

export class UpdateTrainingSessionDto {

  @ApiProperty({type: ProgramDto})
  program: ProgramDto;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  duration?: number;
}

export const toUpdateTrainingSessionDto = (
  trainingSession: TrainingSessionEntity,
): UpdateTrainingSessionDto => ({
  program: toProgramDto(trainingSession.program),
});
