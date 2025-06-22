import { Injectable } from '@nestjs/common';
import { ClubEntity } from './entities/club.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubDto, toClubDto } from './dto/club.dto';
import { UserRole } from 'src/user/enum/user.enum';
import { toUserDto, UserDto } from 'src/user/dto/userDto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ClubService {

    constructor(
        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll(): Promise<ClubDto[]> {
        const clubs = await this.clubRepository.find({
            relations: ['users'],
        });
        return clubs.map((club) => toClubDto(club));
    }

    async findById(id: string): Promise<ClubDto> {
        const club = await this.clubRepository.findOne({
            where: { id: String(id) },
            relations: ['users'],
        });
        if (!club) {
            throw new Error(`Club with ID ${id} not found`);
        }
        return toClubDto(club);
    }

    async create(club: ClubEntity): Promise<ClubDto> {
        const savedClub = await this.clubRepository.save(club);
        return toClubDto(savedClub);
    }

    async update(id: string, club: ClubEntity): Promise<ClubDto> {
        await this.clubRepository.update(id, club);
        const updatedClub = await this.clubRepository.findOne({
            where: { id: String(id) },
            relations: ['users'],
        });
        if (!updatedClub) {
            throw new Error(`Club with ID ${id} not found after update`);
        }
        return toClubDto(updatedClub);
    }

    async delete(id: string): Promise<void> {
        const result = await this.clubRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Club with ID ${id} not found`);
        }
    }

    async findAthleteByCoach(coachId: string): Promise<UserDto[]> {
        const coach = await this.clubRepository.findOne({
            where: { users: { id: coachId, role: UserRole.COACH } },
            relations: ['users'],
        });
        if (!coach) {
            throw new Error(`Coach with ID ${coachId} not found`);
        }

        const athelete = await this.userRepository.find({
            where: { club: { id: coach.id }, role: UserRole.ATHLETE },
            relations: ['club'],
        });
        return athelete.map((user) => toUserDto(user));
    }

    async listCoachesByClub(clubId: string): Promise<UserDto[]> {
        const club = await this.clubRepository.findOne({
            where: { id: String(clubId) },
            relations: ['users'],
        });
        if (!club) {
            throw new Error(`Club with ID ${clubId} not found`);
        }

        const coaches = club.users.filter(user => user.role === UserRole.COACH);
        return coaches.map((user) => toUserDto(user));
    }
    
}
