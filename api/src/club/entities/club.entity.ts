import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {Entities} from "../../common/entities.enum";

@Entity({name: Entities.CLUB})
export class ClubEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    email: string;

    @OneToMany(() => UserEntity, (user) => user.club)
    users: UserEntity[];
}
