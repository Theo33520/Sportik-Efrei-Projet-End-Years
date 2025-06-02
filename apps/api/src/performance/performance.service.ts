import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerformanceEntity } from './entities/performance.entity';
import { Repository } from 'typeorm';
import { PerformanceDto, toPerformanceDto } from './dto/performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(PerformanceEntity)
    private readonly performanceRepository: Repository<PerformanceEntity>,
  ) {}

  async findAll(): Promise<PerformanceDto[]> {
    const performances = await this.performanceRepository.find();
    return performances.map((performance) => toPerformanceDto(performance));
  }

  async findByUserId(user_id: string): Promise<PerformanceDto[]> {
    const performances = await this.performanceRepository.find({
      where: { user: { id: user_id } },
      relations: ['user']
    });
    return performances.map((performance) => toPerformanceDto(performance));
  }
}
