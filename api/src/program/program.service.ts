import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProgramEntity } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramDto, toProgramDto } from './dto/program.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private programRepository: Repository<ProgramEntity>,
  ) {}

  async findAll(): Promise<ProgramDto[]> {
    const programs = await this.programRepository.find();
    return programs.map((program) => toProgramDto(program));
  }

  async findOne(userId: string): Promise<ProgramDto> {
    const program = await this.programRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'coach'],
    });
    if (!program) {
      throw new Error(`Program with user ID ${userId} not found`);
    }
    return toProgramDto(program);
  }

  async create(program: ProgramEntity): Promise<ProgramDto> {
    const savedProgram = await this.programRepository.save(program);
    return toProgramDto(savedProgram);
  }

  async update(id: string, program: ProgramEntity): Promise<ProgramDto> {
    await this.programRepository.update(id, program);
    const updatedProgram = await this.programRepository.findOneBy({ id });
    if (!updatedProgram) {
      throw new Error(`Program with ID ${id} not found after update`);
    }
    return toProgramDto(updatedProgram);
  }
}
