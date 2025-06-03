import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../notification/entities/notification.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class NotificationSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(NotificationSeederService.name);

  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.notificationRepository.count();

    if (count === 0) {
      this.logger.log(
        'No notifications found. Seeding sample notifications...',
      );

      const sender = await this.userRepository.findOne({
        where: { email: process.env.ADMIN_EMAIL },
      });
      const receiver = await this.userRepository.findOne({
        where: { email: process.env.ATHLETE_EMAIL },
      });

      if (!sender || !receiver) {
        this.logger.warn(
          'Cannot seed notifications: sender or receiver user not found.',
        );
        return;
      }

      const notification1 = this.notificationRepository.create({
        sender,
        receiver,
        description: 'Bienvenue sur la plateforme !',
        read: false,
      });

      const notification2 = this.notificationRepository.create({
        sender,
        receiver,
        description: 'Nouveau programme disponible.',
        read: false,
      });

      await this.notificationRepository.save([notification1, notification2]);

      this.logger.log('Sample notifications created.');
    } else {
      this.logger.log('Notifications already exist. Skipping seeding.');
    }
  }
}
