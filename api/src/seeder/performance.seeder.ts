import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceEntity } from '../performance/entities/performance.entity';
import { UserEntity } from '../user/entities/user.entity';
import { PerformanceUnit } from '../performance/enum/unit.perf.enum';

@Injectable()
export class PerformanceSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(PerformanceSeederService.name);

  constructor(
    @InjectRepository(PerformanceEntity)
    private readonly performanceRepository: Repository<PerformanceEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.performanceRepository.count();

    if (count === 0) {
      this.logger.log(
        'No performance records found. Seeding sample performances...',
      );

      const athlete = await this.userRepository.findOne({
        where: { email: process.env.ATHLETE_EMAIL },
      });

      if (!athlete) {
        this.logger.warn('Cannot seed performances: Athlete user not found.');
        return;
      }

      const performance1 = this.performanceRepository.create({
        date: new Date(),
        value: 5.2,
        unit: PerformanceUnit.Kilometers,
        description: 'Course à pied du matin',
        user: athlete,
      });

      const performance2 = this.performanceRepository.create({
        date: new Date(),
        value: 30,
        unit: PerformanceUnit.Minutes,
        description: 'Session de vélo',
        user: athlete,
      });

      await this.performanceRepository.save([performance1, performance2]);

      this.logger.log('Sample performance records created.');
    } else {
      this.logger.log('Performance records already exist. Skipping seeding.');
    }
  }
}
