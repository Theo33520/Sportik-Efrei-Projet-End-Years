import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingSessionEntity } from './entities/trainingSession.entity';
import { toTrainingSessionDto, TrainingSessionDto } from './dto/TranningSession.dto';
import { startOfWeek, endOfWeek, isWithinInterval, differenceInMinutes, compareAsc, isAfter } from 'date-fns';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { UserRole } from 'src/user/enum/user.enum';
import { TrainingSummaryDto } from './dto/Training-summary.dto';
import { console } from 'inspector';
import { logger } from '@mikro-orm/nestjs';
import { toProgramDto } from 'src/program/dto/program.dto';


@Injectable()
export class TrainingSessionService {
  constructor(
    @InjectRepository(TrainingSessionEntity)
    private trainingSessionRepository: Repository<TrainingSessionEntity>,

    @InjectRepository(ProgramEntity)
    private programRepository: Repository<ProgramEntity>,
  ) {}

  async findAll(): Promise<TrainingSessionDto[]> {
    const sessions = await this.trainingSessionRepository.find({
      relations: ['program'],
    });
    return sessions.map(toTrainingSessionDto);
  }

  async findByUserIdAthelete(userId: string): Promise<TrainingSessionDto[]> {
    const sessions = await this.trainingSessionRepository.find({
      where: { program: { athletes: { id: userId, role: UserRole.ATHLETE } } },
      relations: ['program'],
    });
    return sessions.map(toTrainingSessionDto);
  }

  async findByUserIdCoach(userId: string): Promise<TrainingSessionDto[]> {
    const sessions = await this.trainingSessionRepository.find({
      where: { program: { coach: { id: userId, role: UserRole.COACH } } },
      relations: ['program'],
    });
    return sessions.map(toTrainingSessionDto);
  }

  async getTrainingSummaryForCurrentWeek(
    userId: string,
  ): Promise<TrainingSummaryDto> {
    const program = await this.programRepository.findOne({
      where: { athletes: { id: userId, role: UserRole.ATHLETE }, },
      relations: ['athletes', 'training'],
    });

    if (!program) {
      throw new Error(`Program not found for user ID ${userId}`);
    }

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const trainingsThisWeek = program.training.filter((session) => {
      const sessionDate = new Date(session.startDate);
      return isWithinInterval(sessionDate, { start: weekStart, end: weekEnd });
    });

    for (const session of trainingsThisWeek) {
      if (new Date(session.endDate) < now) {
        session.isCompleted = true;
      }
    }

    const completedSessions = trainingsThisWeek.filter(
      (session) => session.isCompleted,
    );
    const incompleteSessions = trainingsThisWeek.filter(
      (session) => !session.isCompleted,
    );

    const totalMinutes = completedSessions.reduce((sum, session) => {
      const start = new Date(session.startDate).getTime();
      const end = new Date(session.endDate).getTime();
      return sum + (end - start) / 1000 / 60;
    }, 0);
    const nextSession = incompleteSessions.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )[0];

    const lastSessions = completedSessions
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
      .slice(0, 5);

    const result: TrainingSummaryDto = {
      totalDuration: totalMinutes,
      sessionCount: completedSessions.length,
      nextSession: nextSession ? nextSession.name : null,
      lastSessions: lastSessions.map((session) => ({
        startDate: session.startDate,
        endDate: session.endDate,
        isCompleted: session.isCompleted,
        program: toProgramDto(program)
      })),
    };
    return result;
  }
}
