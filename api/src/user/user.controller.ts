import {Body, Controller, Get, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserEntity} from "./entities/user.entity";
import {Controllers} from "../common/controller.enum";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Entities} from "../common/entities.enum";
import {JwtAuthGuard} from "../guards/jwt-auth-guard";
import {IsLoggedInGuard} from "../guards/is-logged-in-guard";
import {toUserDto, UserDto} from "./dto/userDto";
import {UserProfileDto} from "./dto/user-profilDto";
import { UserRole } from './enum/user.enum';
import { UserRoleDto } from './dto/user-roleDto';
import { CompetitionDto } from 'src/competition/dto/competitions.dto';
import { CompetititonAthleteDto } from 'src/competition/dto/competitions.athlete.dto';
import { UserSummaryDto } from './dto/user-summary.dto';
import { ProgramDto } from 'src/program/dto/program.dto';
import { AthleteDto } from './dto/Athlete.dto';


@Controller(Controllers.USER)
@ApiTags(Entities.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('/me')
  @ApiOperation({ operationId: 'Get User from token' })
  @ApiOkResponse({
    description: 'Get user from token',
    type: UserDto,
  })
  async getUserFromToken(@Request() req: any): Promise<UserDto> {
    if (!req.user) {
      throw new Error('User not found in request');
    }
    if (!req.user.id) {
      throw new Error('User ID not found in request');
    }
    return this.userService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get()
  @ApiOperation({ operationId: 'Get all users' })
  @ApiOkResponse({
    description: 'Get all users',
    type: [UserDto],
  })
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':id')
  @ApiOperation({ operationId: 'Get user by id' })
  @ApiOkResponse({
    description: 'Get user by id',
    type: UserDto,
  })
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':id/profile')
  @ApiOperation({ operationId: 'Get user by id to profil' })
  @ApiOkResponse({
    description: 'Get  user by id to profil',
    type: UserProfileDto,
  })
  async findOneProfile(@Param('id') id: string): Promise<UserProfileDto> {
    return this.userService.findByIdToProfilSession(id);
  }

  @Post('/register')
  @ApiOperation({ operationId: 'Register user' })
  @ApiOkResponse({
    description: 'Register user',
  })
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Put(':id')
  @ApiOperation({ operationId: 'Update user' })
  @ApiOkResponse({
    description: 'Update user',
    type: UserProfileDto,
  })
  async update(
    @Param('id') id: string,
    @Body() user: UserEntity,
  ): Promise<UserProfileDto> {
    return this.userService.updateUserToProfil(id, user);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':id/role')
  @ApiOperation({ operationId: 'Get User Role' })
  @ApiOkResponse({
    description: 'Get user role',
    type: UserRoleDto,
  })
  async getUserRole(@Param('id') id: string): Promise<{ role: UserRole }> {
    return this.userService.getRoleUser(id);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Post('/register/athlete')
  @ApiOperation({ operationId: 'Create user with role Athlete' })
  @ApiOkResponse({
    description: 'Create user with role Athlete',
    type: UserDto,
  })
  async createAthlete(@Body() user: UserEntity): Promise<UserDto> {
    return this.userService.createAthlete(user);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('/competition/coach/:coachId')
  @ApiOperation({ operationId: 'Get all competition by coach ID' })
  @ApiOkResponse({
    description: 'Get all competition by coach ID',
    type: [CompetitionDto],
  })
  async getAllCompetitionByCoachId(
    @Param('coachId') coachId: string,
  ): Promise<CompetitionDto[]> {
    return this.userService.getCompetitionsByCoach(coachId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('/competition/athlete/:athleteId')
  @ApiOperation({ operationId: 'Get all competition by athlete ID' })
  @ApiOkResponse({
    description: 'Get all competition by athlete ID',
    type: [CompetitionDto],
  })
  async getAllCompetitionByAthleteId(
    @Param('athleteId') athleteId: string,
  ): Promise<CompetititonAthleteDto[]> {
    return this.userService.getCompetitionsByAthlete(athleteId);
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get('coach/dashboard/:coachId')
  @ApiOperation({ operationId: 'Get all data dashboard by coach ID' })
  @ApiOkResponse({
    description: 'Get all data dashboard by coach ID',
    type: UserSummaryDto,
  })
  async getDashboardDataByCoachId(
    @Param('coachId') coachId: string,
  ): Promise<UserSummaryDto> {
    return this.userService.getSummaryCoach(coachId);
  }

  @Get('data/athlete/:athleteId')
  @ApiOperation({ operationId: 'Get all program by athlete ID' })
  @ApiOkResponse({
    description: 'Get all program by athlete ID',
    type: [AthleteDto],
  })
  async getAllProgramByAthleteId(
    @Param('athleteId') athleteId: string,
  ): Promise<AthleteDto> {
    return this.userService.getDataToAthlete(athleteId);
  }
}