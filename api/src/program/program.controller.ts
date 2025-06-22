import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Controllers } from '../common/controller.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgramEntity } from './entities/program.entity';
import { ProgramService } from './program.service';
import { ProgramDto } from './dto/program.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { IsLoggedInGuard } from 'src/guards/is-logged-in-guard';

@Controller(Controllers.PROGRAM)
@ApiTags(Controllers.PROGRAM)
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get()
  @ApiOperation({ operationId: 'Get all programs' })
  async findAll(): Promise<ProgramDto[]> {
    return this.programService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':coachId')
  @ApiOperation({ operationId: 'Get program by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the program for the specified user ID',
    type: ProgramDto,
  })
  async findOne(@Param(':coachId') userId: string): Promise<ProgramDto> {
    return this.programService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('coach/:coachId')
  @ApiOperation({ operationId: 'Get programs by coach ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of programs for the specified coach ID',
    type: [ProgramDto],
  })
  async programByCoachId(
    @Param('coachId') coachId: string,
  ): Promise<ProgramDto[]> {
    return this.programService.programByCoachId(coachId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Post('/create')
  @ApiOperation({ operationId: 'Create a new program' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created program',
    type: ProgramDto,
  })
  async create(@Body() program: ProgramEntity): Promise<ProgramDto> {
    return this.programService.create(program);
  }


  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Post('/delete/:id')
  @ApiOperation({ operationId: 'Delete a program' })
  @ApiResponse({
    status: 200,
    description: 'Returns a success message',
  })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.programService.delete(id);
    return { message: 'Program deleted successfully' };
  }
}