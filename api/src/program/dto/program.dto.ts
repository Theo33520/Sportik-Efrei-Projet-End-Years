import { IsString, IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
import { ProgramEntity } from '../entities/program.entity';

export class ProgramDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  coachId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export const toProgramDto = (entity: ProgramEntity): ProgramDto => ({
  userId: entity.user?.id,
  coachId: entity.coach?.id,
  title: entity.title,
  description: entity.description,
});