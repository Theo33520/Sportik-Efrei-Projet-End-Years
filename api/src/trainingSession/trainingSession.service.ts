import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingSessionEntity } from './entities/trainingSession.entity';
import { toTrainingSessionDto, TrainingSessionDto } from './dto/TranningSession.dto';
import { startOfWeek, endOfWeek, isWithinInterval, differenceInMinutes, compareAsc, isAfter } from 'date-fns';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { UserRole } from 'src/user/enum/user.enum';
import { TrainingSummaryDto } from './dto/Training-summary.dto';


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
      where: { program: { user: { id: userId, role: UserRole.ATHLETE } } },
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
    const now = new Date();
    const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const sessions = await this.trainingSessionRepository.find({
      where: {
        program: {
          user: {
            id: userId,
            role: UserRole.ATHLETE,
          },
        },
      },
      relations: ['program', 'program.user'],
    });

    let totalDuration = 0;
    let sessionCount = 0;
    let nextSessionTitle: string | null = null;

    const upcomingSessions: TrainingSessionEntity[] = [];
    const lastSessions: TrainingSessionEntity[] = [];

    for (const session of sessions) {
      const isInThisWeek = isWithinInterval(session.startDate, {
        start: currentWeekStart,
        end: currentWeekEnd,
      });

      if (isInThisWeek) {
        if (session.isCompleted) {
          totalDuration += differenceInMinutes(
            session.endDate,
            session.startDate,
          );
          sessionCount++;
          lastSessions.push(session);
        } else if (isAfter(session.startDate, now)) {
          upcomingSessions.push(session);
        }
      }
    }

    if (upcomingSessions.length > 0) {
      upcomingSessions.sort((a, b) => compareAsc(a.startDate, b.startDate));
      nextSessionTitle = upcomingSessions[0].title;
    }
    const last5Sessions = lastSessions
      .sort((a, b) => compareAsc(b.startDate, a.startDate))
      .slice(0, 5);

    return {
      totalDuration,
      sessionCount,
      nextSession: nextSessionTitle,
      lastSessions: last5Sessions.map(toTrainingSessionDto),
    };
  }
}