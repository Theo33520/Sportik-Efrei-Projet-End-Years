import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {ProgramEntity} from "./entities/program.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProgramService {

    constructor(
        @InjectRepository(ProgramEntity)
        private programRepository: Repository<ProgramEntity>,
    ) {}

    async findAll(): Promise<ProgramEntity[]> {
        return this.programRepository.find();
    }

    async findOne(id: string): Promise<ProgramEntity> {
        return this.programRepository.findOneBy({id: String(id)});
    }
}
