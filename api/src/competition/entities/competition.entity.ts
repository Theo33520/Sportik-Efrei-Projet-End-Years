import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {Entities} from "../../common/entities.enum";

@Entity({name: Entities.COMPETITION})
export class CompetitionEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    location: string;

    @Column()
    date: Date;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[];
}
