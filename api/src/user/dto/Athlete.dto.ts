import { ApiProperty } from "@nestjs/swagger";
import { toTrainingDto, TrainingDto } from "src/trainingSession/dto/Tranning.dto";
import { ProgramEntity } from "../../program/entities/program.entity";
import { UserEntity } from "../entities/user.entity";
import { CompetitionEntity } from "src/competition/entities/competition.entity";
import { CompetititonAthleteDto, toComppetititonAthleteDto } from "src/competition/dto/competitions.athlete.dto";


export class AthleteDto {
  @ApiProperty()
  programTitle: string;

  @ApiProperty()
  programDescription: string;

  @ApiProperty({ type: [TrainingDto] })
  trainings: TrainingDto[];

  @ApiProperty({ type: [CompetititonAthleteDto] })
  competitions: CompetititonAthleteDto[];
}

export const toAthleteDto = (
  user: UserEntity,
  program: ProgramEntity,
): AthleteDto => ({
  programTitle: program.title,
  programDescription: program.description,
  trainings: program.training?.map((training) => toTrainingDto(training)) || [],
  competitions:
    user.competitions?.map((competition) => toComppetititonAthleteDto(competition)) ||
    [],
});