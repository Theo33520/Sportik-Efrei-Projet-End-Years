import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramEntity } from '../program/entities/program.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TrainingSessionEntity } from '../trainingSession/entities/trainingSession.entity';

@Injectable()
export class ProgramSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ProgramSeederService.name);

  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TrainingSessionEntity)
    private readonly trainingRepository: Repository<TrainingSessionEntity>,
  ) {}

  async onApplicationBootstrap() {
    try {
      const count = await this.programRepository.count();

      if (count > 0) {
        return;
      }

      const user = await this.userRepository.findOne({
        where: { email: process.env.ATHLETE_EMAIL },
      });

      const coach = await this.userRepository.findOne({
        where: { email: process.env.COACH_EMAIL },
      });

      if (!user || !coach) {
        return;
      }

      const programsData: Partial<ProgramEntity>[] = [
        {
          title: 'Programme de course à pied',
          description:
            'Un programme pour améliorer votre endurance en course à pied.',
          coach,
        },
        {
          title: 'Programme de musculation',
          description: 'Un programme pour développer la masse musculaire.',
          coach,
        },
      ];

      for (const data of programsData) {
        const program = this.programRepository.create(data);
        const savedProgram = await this.programRepository.save(program);

        for (let i = 1; i <= 10; i++) {
          const today = new Date();
          let startDate = new Date(today);
          let isCompleted = false;

          if (i <= 3) {
            startDate.setDate(today.getDate() - (7 - i * 2));
            isCompleted = true;
          } else if (i <= 6) {
            startDate.setDate(today.getDate() - (6 - i));
            isCompleted = true;
          } else {
            startDate.setDate(today.getDate() + (i - 6) * 2);
            isCompleted = false;
          }

          const endDate = new Date(startDate);
          endDate.setHours(startDate.getHours() + 1);

          const training = this.trainingRepository.create({
            program: savedProgram,
            name: `Séance ${i} - ${savedProgram.title}`,
            description: `Description de la séance ${i}`,
            startDate,
            endDate,
            isCompleted,
          });

          await this.trainingRepository.save(training);
        }
      }
    } catch (error) {
      this.logger.error('❌ Erreur pendant le seeding des programmes :', error);
    }
  }
}
