import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {Entities} from "../../common/entities.enum";

@Entity({name: Entities.PROGRAM})
export class ProgramEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, user => user.program)
    user: UserEntity;

    @ManyToOne(() => UserEntity)
    coach: UserEntity;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    startDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
