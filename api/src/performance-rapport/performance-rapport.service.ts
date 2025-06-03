import {Injectable, Param} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PerformanceRapportEntity} from "./entities/performance-rapport";
import {Repository} from "typeorm";

@Injectable()
export class PerformanceRapportService {

    constructor(
        @InjectRepository(PerformanceRapportEntity)
        private readonly performanceRapportRepository: Repository<PerformanceRapportEntity>,
    ) {}

    async findAll(): Promise<PerformanceRapportEntity[]> {
        return this.performanceRapportRepository.find();
    }

    async findOne(@Param("id") id: string): Promise<PerformanceRapportEntity> {
        return this.performanceRapportRepository.findOneBy({id: String(id)});
    }
}
