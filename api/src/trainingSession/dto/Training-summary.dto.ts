import { ApiProperty } from '@nestjs/swagger';
import { TrainingSessionDto } from './TranningSession.dto';

export class TrainingSummaryDto {
  @ApiProperty()
  totalDuration: number;

  @ApiProperty()
  sessionCount: number;

  @ApiProperty({ nullable: true })
  nextSession: string;

  @ApiProperty({ nullable: true, type: [TrainingSessionDto] })
  lastSessions: TrainingSessionDto[];
}
