import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { IsLoggedInGuard } from '../guards/is-logged-in-guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controllers } from '../common/controller.enum';
import { PerformanceDto } from './dto/performance.dto';

@Controller(Controllers.PERFORMANCE)
@ApiTags(Controllers.PERFORMANCE)
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get()
  @ApiOperation({ operationId: 'Get all performances' })
  @ApiOkResponse({
    description: 'Get all performances',
    type: PerformanceDto,
  })
  async findAll(): Promise<PerformanceDto[]> {
    return this.performanceService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':user_id')
  @ApiOperation({ operationId: 'Get all performances by user id' })
  @ApiOkResponse({
    description: 'Get all performances by user id',
    type: [PerformanceDto],
  })
  async findByUserId(
    @Param('user_id') user_id: string): Promise<PerformanceDto[]> {
    return this.performanceService.findByUserId(user_id);
  }
}
