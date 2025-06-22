import { ApiProperty } from "@nestjs/swagger";
import { TrainingSessionEntity } from "../entities/trainingSession.entity";



export class TrainingDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}

export const toTrainingDto = (entity: TrainingSessionEntity): TrainingDto => ({
  name: entity.name,
  description: entity.description,
  startDate: entity.startDate,
  endDate: entity.endDate,
});
