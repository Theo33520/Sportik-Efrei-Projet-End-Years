import {HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {toUserDto, UserDto} from "./dto/userDto";
import {toUserProfilDto, UserProfileDto} from "./dto/user-profilDto";
import * as bcrypt from 'bcrypt';
import { UserRole } from './enum/user.enum';
import {jwtConstants} from "../auth/constants";
import { AthleteCategory } from './enum/atheleteCategory.enum';
import { CompetitionDto, toCompetitionDto } from 'src/competition/dto/competitions.dto';
import { CompetititonAthleteDto, toComppetititonAthleteDto } from 'src/competition/dto/competitions.athlete.dto';
import { UserSummaryDto } from './dto/user-summary.dto';
import { ClubEntity } from 'src/club/entities/club.entity';
import { ClubService } from 'src/club/club.service';
import { ProgramDto } from 'src/generated/typing';
import { toProgramDto } from 'src/program/dto/program.dto';
import { AthleteDto, toAthleteDto } from './dto/Athlete.dto';
import { CompetitionEntity } from 'src/competition/entities/competition.entity';
import { logger } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
    private readonly clubService: ClubService,
    @InjectRepository(CompetitionEntity)
    private readonly competitionRepository: Repository<CompetitionEntity>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => toUserDto(user));
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
      relations: ['club'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return toUserDto(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async filterLogin(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async findByIdToProfilSession(id: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return toUserProfilDto(user);
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    data.password = await bcrypt.hash(data.password, 10);
    const isExisting = await this.userRepository.findOne({
      where: { email: String(data.email) },
    });
    if (isExisting) {
      throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.save(data);
  }
  async updateUserToProfil(
    id: string,
    dto: Partial<UserEntity>,
  ): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(user, dto);
    await this.userRepository.save(user);
    return toUserProfilDto(user);
  }

  async getRoleUser(id: string): Promise<{ role: UserRole }> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
    });
    return { role: user.role };
  }

  async createAthlete(data: Partial<UserEntity>): Promise<UserDto> {
    data.role = UserRole.ATHLETE;
    data.password = await bcrypt.hash(data.password, 10);
    const isExisting = await this.userRepository.findOne({
      where: { email: String(data.email) },
    });
    if (isExisting) {
      throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
    }
    if (!data.Age) {
      throw new HttpException('Age is required', HttpStatus.BAD_REQUEST);
    }

    data.category = this.getAthleteCategory(data.Age);

    const saved = await this.userRepository.save(data);
    return toUserDto(saved);
  }

  private getAthleteCategory(age: number): AthleteCategory {
    if (age < 15) return AthleteCategory.BENJAMIN;
    if (age < 17) return AthleteCategory.CADET;
    if (age < 20) return AthleteCategory.JUNIOR;
    if (age < 25) return AthleteCategory.U23;
    return AthleteCategory.SENIOR;
  }

  async getCompetitionsByCoach(id: string): Promise<CompetitionDto[]> {
    const coach = await this.userRepository.findOne({
      where: { id: String(id), role: UserRole.COACH },
      relations: ['competitionsAsCoach', 'competitionsAsCoach.users'],
    });

    if (!coach) {
      throw new HttpException('Coach not found', HttpStatus.NOT_FOUND);
    }

    return coach.competitionsAsCoach.map((competition) =>
      toCompetitionDto(competition),
    );
  }

  async getCompetitionsByAthlete(
    id: string,
  ): Promise<CompetititonAthleteDto[]> {
    const athlete = await this.userRepository.findOne({
      where: { id: String(id), role: UserRole.ATHLETE },
      relations: ['competitions'],
    });

    if (!athlete) {
      throw new HttpException('Athlete not found', HttpStatus.NOT_FOUND);
    }

    return athlete.competitions.map((competition) =>
      toComppetititonAthleteDto(competition),
    );
  }

  async getSummaryCoach(coachId: string): Promise<UserSummaryDto> {
    try {
      const coach = await this.userRepository.findOne({
        where: { id: String(coachId), role: UserRole.COACH },
        relations: ['club', 'competitionsAsCoach'],
      });

      if (!coach) {
        logger.warn(`Coach with ID ${coachId} not found.`);
        throw new NotFoundException(`Coach with ID ${coachId} not found.`);
      }

      const athleteCount = (await this.clubService.findAthleteByCoach(coachId))
        .length;
      const clubName = coach.club?.name || 'Unknown Club';
      const currentDate = new Date();
      let nextCompetition = null;
      let minDiff = Infinity;

      for (const competition of coach.competitionsAsCoach) {
        const competitionDate = new Date(competition.date);
        const diff = competitionDate.getTime() - currentDate.getTime();

        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextCompetition = competition;
        }
      }

      return {
        clubName: clubName,
        atheleteCount: athleteCount,
        nextCompetionName:
          nextCompetition?.title || 'Aucune compétition à venir',
        nextCompetionLocation:
          nextCompetition?.location || 'Aucun lieu spécifié',
      };
    } catch (error) {
      logger.error(`Error in getSummaryCoach: ${error.message}`);
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la récupération du résumé du coach.',
      );
    }
  }

  async getDataToAthlete(id: string): Promise<AthleteDto> {
    try {
      const athlete = await this.userRepository.findOne({
        where: { id: String(id), role: UserRole.ATHLETE },
        relations: ['program', 'program.training', 'competitions'],
      });

      if (!athlete) {
        logger.warn(`Athlete with ID ${id} not found.`);
        throw new NotFoundException(`Athlete with ID ${id} not found.`);
      }

      const program = athlete.program;
      return toAthleteDto(athlete, program);
    } catch (error) {
      logger.error(`Error in getDataToAthlete: ${error.message}`);
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la récupération des données de l’athlète.',
      );
    }
  }

  async getSummaryAdmin(id: string): Promise<void> {
    const club = await this.clubRepository.count();
    if (!club) {
      throw new NotFoundException('Aucun club trouvé');
    }
    const competition = await this.competitionRepository.count();
    if (!competition) {
      throw new NotFoundException('Aucune compétition trouvée');
    }
    const athlete = await this.userRepository.count({
      where: { role: UserRole.ATHLETE },
    });

    const coach = await this.userRepository.count({
      where: { role: UserRole.COACH },
    });

  }
}