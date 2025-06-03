import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controllers } from 'src/common/controller.enum';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { IsLoggedInGuard } from 'src/guards/is-logged-in-guard';
import { NotificationDto } from './dto/notification.dto';

@Controller(Controllers.NOTIFICATION)
@ApiTags(Controllers.NOTIFICATION)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get()
  @ApiOperation({ operationId: 'Get all notifications' })
  @ApiOkResponse({
    description: 'Get all notications',
    type: NotificationDto,
  })
  async findAll(): Promise<NotificationDto[]> {
    return this.notificationService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsLoggedInGuard)
  @Get(':user_id/conversations')
  @ApiOperation({ operationId: 'Get conversation by user id' })
  @ApiOkResponse({
    description: 'Get conversation by ID',
    type: [NotificationDto],
  })
  async findConversation(
    @Param('user_id') user_id: string,
  ): Promise<NotificationDto[]> {
    return this.notificationService.findConversations(user_id);
  }
}
