import { ApiProperty } from "@nestjs/swagger";
import { CompetitionEntity } from "../entities/competition.entity";


export class CompetititonAthleteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  date: Date;
}

export const toComppetititonAthleteDto = (
  entity: CompetitionEntity,
): CompetititonAthleteDto => ({
  title: entity.title,
  location: entity.location,
  date: entity.date,
});