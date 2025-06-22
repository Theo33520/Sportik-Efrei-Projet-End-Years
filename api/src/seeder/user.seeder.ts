import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user/enum/user.enum';
import { faker } from '@faker-js/faker';
import { ClubEntity } from 'src/club/entities/club.entity';
import { AthleteCategory } from 'src/user/enum/atheleteCategory.enum';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async onApplicationBootstrap() {
    const usersCount = await this.userRepository.count();

    if (usersCount > 10) {
      return;
    }

    console.log(
      '[Seeder] No users or not enough users. Proceeding with seeding...',
    );
    this.logger.log('Seeding default admin, coach, club and athletes...');

    const clubName = 'Club Fake ' + faker.address.city();
    const club = this.clubRepository.create({
      name: clubName,
    });
    await this.clubRepository.save(club);


    const admin = this.userRepository.create({
      firstname: process.env.ADMIN_FIRSTNAME,
      lastname: process.env.ADMIN_LASTNANE,
      email: process.env.ADMIN_EMAIL,
      password: await bcrypt.hash(process.env.ADMIN_PWD, 10),
      role: UserRole.ADMIN,
    });

    const coach = this.userRepository.create({
      firstname: process.env.COACH_FIRSTNAME,
      lastname: process.env.COACH_LASTNANE,
      email: process.env.COACH_EMAIL,
      password: await bcrypt.hash(process.env.COACH_PWD, 10),
      role: UserRole.COACH,
    });
    const athletes = [];
    for (let i = 0; i < 10; i++) {
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      const email = faker.internet.email({
        firstName: faker.person.firstName().toLowerCase(),
      });
      const passwordHash = await bcrypt.hash('defaultPassword123', 10);

      const athlete = this.userRepository.create({
        firstname,
        lastname,
        email,
        password: passwordHash,
        role: UserRole.ATHLETE,
        clubId: club.id,
        club: club,
        phoneNumber: faker.phone.number(),
        Age: faker.number.int({ min: 14, max: 30 }),
        height: faker.number.int({ min: 150, max: 200 }),
        weight: faker.number.int({ min: 50, max: 100 }),
        address: faker.location.streetAddress(),
        category: AthleteCategory.CADET
      });
      athletes.push(athlete);
    }

    const athelete = this.userRepository.create({
      firstname: 'Athlete',
      lastname: 'Test',
      email: process.env.ATHLETE_EMAIL,
      password: await bcrypt.hash(process.env.ATHLETE_PWD, 10),
      role: UserRole.ATHLETE,
      clubId: club.id,
      club: club,
      phoneNumber: faker.phone.number(),
      Age: faker.number.int({ min: 14, max: 30 }),
      height: faker.number.int({ min: 150, max: 200 }),
      weight: faker.number.int({ min: 50, max: 100 }),
      address: faker.location.streetAddress(),
      category: AthleteCategory.CADET
    });

    athletes.push(athelete);

    await this.userRepository.save([admin, coach, ...athletes]);
  }
}
