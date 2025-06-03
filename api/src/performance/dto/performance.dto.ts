import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { PerformanceUnit } from '../enum/unit.perf.enum';
import { PerformanceEntity } from '../entities/performance.entity';

export class PerformanceDto {
  @ApiProperty({ example: '2025-05-09T10:30:00Z' })
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: 5.2,
    description: 'La valeur mesurée (ex: distance, durée, etc.)',
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ enum: PerformanceUnit, example: PerformanceUnit.Kilometers })
  @IsNotEmpty()
  @IsEnum(PerformanceUnit)
  unit: PerformanceUnit;

  @ApiProperty({ example: 'Course du matin', required: false })
  @IsOptional()
  description?: string;
}

export const toPerformanceDto = (
  performance: PerformanceEntity,
): PerformanceDto => ({
  date: performance.date,
  value: performance.value,
  unit: performance.unit,
  description: performance.description,
});
