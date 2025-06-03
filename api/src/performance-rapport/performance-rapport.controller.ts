import {Controller, Param} from '@nestjs/common';
import {Controllers} from "../common/controller.enum";
import {ApiTags} from "@nestjs/swagger";
import {PerformanceRapportService} from "./performance-rapport.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {PerformanceRapportEntity} from "./entities/performance-rapport";

@Controller(Controllers.PERFORMANCE_RAPPORT)
@ApiTags(Controllers.PERFORMANCE_RAPPORT)
export class PerformanceRapportController {

    constructor(
        @InjectRepository(PerformanceRapportEntity)
        private readonly performanceRapportRepository: Repository<PerformanceRapportEntity>,
    ) {}

    async findAll(): Promise<PerformanceRapportEntity[]> {
        return this.performanceRapportRepository.find();
    }

    async findOne(@Param("id") id: string): Promise<PerformanceRapportEntity> {
        return this.performanceRapportRepository.findOneBy({id: String(id)})
    }
}
