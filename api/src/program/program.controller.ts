import { Controller, Get, Param } from '@nestjs/common';
import { Controllers } from '../common/controller.enum';
import { ApiTags } from '@nestjs/swagger';
import { ProgramEntity } from './entities/program.entity';
import { ProgramService } from './program.service';
import { ProgramDto } from './dto/program.dto';

@Controller(Controllers.PROGRAM)
@ApiTags(Controllers.PROGRAM)
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  async findAll(): Promise<ProgramDto[]> {
    return this.programService.findAll();
  }

  @Get(':userId')
  async findOne(@Param(':userId') userId: string): Promise<ProgramDto> {
    return this.programService.findOne(userId);
  }
}
