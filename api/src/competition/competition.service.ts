import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CompetitionEntity } from './entities/competition.entity';
import { CompetitionDto, toCompetitionDto } from './dto/competitions.dto';
import { UserEntity } from 'src/user/entities/user.entity';


@Injectable()
export class CompetitionService {
  constructor(
    @InjectRepository(CompetitionEntity)
    private competitionRepository: Repository<CompetitionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<CompetitionDto[]> {
    const competitions = await this.competitionRepository.find();
    return competitions.map((competition) => toCompetitionDto(competition));
  }

  async findByUserId(userId: string): Promise<CompetitionDto[]> {
    const competitions = await this.competitionRepository.find({
      where: { users: { id: userId } },
      relations: ['users', 'coach'],
    });
    return competitions.map((competition) => toCompetitionDto(competition));
  }

  async create(
    competitionData: Partial<CompetitionEntity>,
  ): Promise<CompetitionDto> {
    const { users, coach, ...rest } = competitionData;
    const coachEntity = coach
      ? await this.userRepository.findOneBy({ id: String(coach) })
      : null;
    const competition = this.competitionRepository.create({
      ...rest,
      coach: coachEntity,
    });

    const savedCompetition = await this.competitionRepository.save(competition);
    if (!savedCompetition) {
      throw new Error('Failed to create competition');
    }
    if (users && users.length > 0) {
      const userEntities = await this.userRepository.find({
        where: { id: In(users) },
      });
      savedCompetition.users = userEntities;
      await this.competitionRepository.save(savedCompetition);
    }
    return toCompetitionDto(savedCompetition);
  }

  async delete(id: string): Promise<void> {
    const competition = await this.competitionRepository.findOne({
      where: { id },
      relations: ['users', 'coach'],
    });

    if (!competition) {
      throw new Error(`Competition with id ${id} not found`);
    }
    competition.users = [];
    competition.coach = null;
    await this.competitionRepository.save(competition);
    await this.competitionRepository.remove(competition);
  }
}
