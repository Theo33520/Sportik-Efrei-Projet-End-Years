import { ApiProperty } from "@nestjs/swagger";


export class AdminSummaryDto {
  @ApiProperty({ type: 'number' })
  totalClubs: number;

  @ApiProperty({ type: 'number' })
  totalCompetitions: number;

  @ApiProperty({ type: 'number' })
  totalAthletes: number;

  @ApiProperty({ type: 'number' })
  totalCoaches: number;

  @ApiProperty()
  coachCreatedThisWeek: string;

  @ApiProperty()
  clubCreatedThisWeek: string;
}

