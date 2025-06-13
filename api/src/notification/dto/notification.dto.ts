import { ApiProperty } from '@nestjs/swagger';
import { NotificationEntity } from '../entities/notification.entity';

export class NotificationDto {
  @ApiProperty()
  notification_id: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  receiverId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  name_sender: string;

  @ApiProperty()
  title: string;
}

const capitalize = (s: string): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';

export const toNotificationDto = (
  notification: NotificationEntity,
): NotificationDto => ({
  notification_id: notification.id,
  senderId: notification.sender?.id ?? null,
  receiverId: notification.receiver?.id ?? null,
  description: notification.description,
  read: notification.read,
  name_sender: notification.sender
    ? `${capitalize(notification.sender.firstname)} ${capitalize(notification.sender.lastname)}`
    : '',
  title: notification.title,
});
