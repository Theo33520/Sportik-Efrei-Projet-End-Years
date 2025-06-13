import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateTrainingSessionDto {
  @ApiPropertyOptional({
    description: 'Identifiant du programme associé',
    example: 'f1234567-89ab-cdef-0123-456789abcdef',
  })
  @IsOptional()
  @IsUUID()
  programId?: string;

  @ApiPropertyOptional({
    description: "Date de la session d'entraînement",
    example: '2025-06-12T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiPropertyOptional({
    description: 'Durée de la session en minutes',
    example: 60,
  })
  @IsOptional()
  @IsInt()
  duration?: number;
}

export const toCreateTrainingSessionDto = (
  trainingSession: CreateTrainingSessionDto,
): CreateTrainingSessionDto => ({
  programId: trainingSession.programId,
  date: trainingSession.date,
  duration: trainingSession.duration,
});
