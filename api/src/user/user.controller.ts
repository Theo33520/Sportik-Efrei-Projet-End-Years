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
    console.log('Request user:', req.user);
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
}