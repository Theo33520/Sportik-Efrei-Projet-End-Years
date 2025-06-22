import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProgramEntity } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramDto, toProgramDto } from './dto/program.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { TrainingSessionEntity } from 'src/trainingSession/entities/trainingSession.entity';
import { logger } from '@mikro-orm/nestjs';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private programRepository: Repository<ProgramEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TrainingSessionEntity)
    private trainingRepository: Repository<TrainingSessionEntity>,
  ) {}

  async findAll(): Promise<ProgramDto[]> {
    const programs = await this.programRepository.find();
    return programs.map((program) => toProgramDto(program));
  }

  async findOne(userId: string): Promise<ProgramDto> {
    const program = await this.programRepository.findOne({
      where: { coach: { id: userId } },
      relations: ['athletes', 'coach', 'training'],
    });
    if (!program) {
      throw new Error(`Program with user ID ${userId} not found`);
    }
    return toProgramDto(program);
  }

  async create(programData: Partial<ProgramEntity>): Promise<ProgramDto> {
    const { coach, athletes, training, ...rest } = programData;
    const coachEntity = coach
      ? await this.userRepository.findOneBy({ id: String(coach) })
      : null;

    const program = this.programRepository.create({
      ...rest,
      coach: coachEntity,
    });

    const savedProgram = await this.programRepository.save(program);

    if (!savedProgram) {
      throw new Error('Failed to create program');
    }
    if (athletes && athletes.length > 0) {
      for (const athleteId of athletes) {
        const athlete = await this.userRepository.findOneBy({
          id: String(athleteId),
        });

        if (athlete) {
          athlete.program = savedProgram;
          await this.userRepository.save(athlete);
        }
      }
    }
    if (training && training.length > 0) {
      for (const trainingItem of training) {
        const savedTraining = await this.trainingRepository.save({
          name: trainingItem.name,
          description: trainingItem.description,
          program: savedProgram,
          startDate: trainingItem.startDate,
          endDate: trainingItem.endDate,
        });
      }
    }

    const fullProgram = await this.programRepository.findOne({
      where: { id: savedProgram.id },
      relations: ['coach', 'athletes', 'training'],
    });

    return toProgramDto(fullProgram);
  }

  async delete(id: string): Promise<void> {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: ['athletes', 'training'],
    });

    if (!program) {
      throw new Error('Program not found');
    }

    for (const athlete of program.athletes) {
      athlete.program = null;
      await this.userRepository.save(athlete);
    }
    await this.trainingRepository.delete({ program: { id } });
    await this.programRepository.delete(id);
  }

  async programByCoachId(coachId: string): Promise<ProgramDto[]> {
    const programs = await this.programRepository.find({
      where: { coach: { id: coachId } },
      relations: ['coach', 'training', 'athletes'],
    });

    if (!programs || programs.length === 0) {
      throw new NotFoundException(`No programs found for coach ID ${coachId}`);
    }

    return programs.map((program) => toProgramDto(program));
  }
}
