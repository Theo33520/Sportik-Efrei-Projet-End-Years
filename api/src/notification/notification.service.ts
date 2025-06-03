import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationDto, toNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async findAll(): Promise<NotificationDto[]> {
    const notifications = await this.notificationRepository.find({
      relations: ['sender', 'receiver'],
    });
    return notifications.map((notification) => toNotificationDto(notification));
  }

  async findConversations(userId: string): Promise<NotificationDto[]> {
    const notifications = await this.notificationRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
      order: { id: 'DESC' },
    });
    return notifications.map(toNotificationDto);
  }
}
