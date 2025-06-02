import {Controller, Get, Param} from '@nestjs/common';
import {Controllers} from "../common/controller.enum";
import {ApiTags} from "@nestjs/swagger";
import {ProgramEntity} from "./entities/program.entity";
import {ProgramService} from "./program.service";

@Controller(Controllers.PROGRAM)
@ApiTags(Controllers.PROGRAM)
export class ProgramController {

    constructor(private readonly programService: ProgramService) {}

    @Get()
    async findAll(): Promise<ProgramEntity[]> {
        return this.programService.findAll();
    }

    @Get(':id')
    async findOne(@Param("id") id: string): Promise<ProgramEntity> {
        return this.programService.findOne(id);
    }
}
