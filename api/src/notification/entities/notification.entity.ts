import {UserEntity} from "../../user/entities/user.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Entities} from "../../common/entities.enum";

@Entity({ name: Entities.NOTIFICATION })
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  receiver: UserEntity;

  @Column('text', { default: 'Default Title' })
  title: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  read: boolean;
}
