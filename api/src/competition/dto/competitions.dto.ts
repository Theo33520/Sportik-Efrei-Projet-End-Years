import { ApiProperty } from '@nestjs/swagger';
import { CompetitionEntity } from '../entities/competition.entity';

export class CompetitionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  date: Date;

  @ApiProperty({ type: [String] })
  users: string[];

  @ApiProperty({ required: false })
  coachId?: string;
}

export const toCompetitionDto = (entity: CompetitionEntity): CompetitionDto => ({
  id: entity.id,
  title: entity.title,
  location: entity.location,
  date: entity.date,
  users: entity.users?.map((user) => user.id) || [],
  coachId: entity.coach?.id,
});
