import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user/enum/user.enum';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onApplicationBootstrap() {
    const usersCount = await this.userRepository.count();

    if (usersCount === 0) {
      this.logger.log(
        'No users found. Seeding default admin and coach users...',
      );

      const admin = this.userRepository.create({
        firstname: process.env.ADMIN_FIRSTNAME,
        lastname: process.env.ADMIN_LASTNANE,
        email: process.env.ADMIN_EMAIL,
        password: await bcrypt.hash(process.env.ADMIN_PWD, 10),
        role: UserRole.ADMIN,
      });

      const athele = this.userRepository.create({
        firstname: process.env.ATHLETE_FIRSTNAME,
        lastname: process.env.ATHLETE_LASTNANE,
        email: process.env.ATHLETE_EMAIL,
        password: await bcrypt.hash(process.env.ATHLETE_PWD, 10),
        role: UserRole.ATHLETE,
      });

      const coach = this.userRepository.create({
        firstname: process.env.COACH_FIRSTNAME,
        lastname: process.env.COACH_LASTNANE,
        email: process.env.COACH_EMAIL,
        password: await bcrypt.hash(process.env.COACH_PWD, 10),
        role: UserRole.COACH,
      });

      await this.userRepository.save([admin, athele, coach]);
      this.logger.log('Default admin and coach users created.');
    } else {
      this.logger.log('Users already exist. Skipping seeding.');
    }
  }
}
