import {UserEntity} from "../../user/entities/user.entity";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Entities} from "../../common/entities.enum";

@Entity({name: Entities.PERFORMANCE_RAPPORT})
export class PerformanceRapportEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.performanceRapport, { nullable: true })
    athlete: UserEntity;


    @ManyToOne(() => UserEntity)
    coach: UserEntity;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}