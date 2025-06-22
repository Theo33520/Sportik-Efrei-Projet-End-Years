import { ApiProperty } from '@nestjs/swagger';
import { ProgramDto, toProgramDto } from '../../program/dto/program.dto';
import { TrainingSessionEntity } from '../entities/trainingSession.entity';

export class TrainingSessionDto {

  @ApiProperty()
  program: ProgramDto;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  isCompleted?: boolean;
}

export const toTrainingSessionDto = (
  session: TrainingSessionEntity,
): TrainingSessionDto => ({
  program: toProgramDto(session.program),
  startDate: session.startDate,
  endDate: session.endDate,
  isCompleted: session.isCompleted || false,
});
