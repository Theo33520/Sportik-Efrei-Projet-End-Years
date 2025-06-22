import { ApiProperty } from "@nestjs/swagger";
import { Api } from "src/generated/typing";


export class UserSummaryDto {
  @ApiProperty()
  clubName: string;

  @ApiProperty()
  atheleteCount: number;

  @ApiProperty()
  nextCompetionName: string;

  @ApiProperty()
  nextCompetionLocation: string;
}