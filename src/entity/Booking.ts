import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Event } from './Event';

@Entity() // se puede pasar como parametro el nombre de tabla ej: 'usersTable'
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Event, (event) => event.bookings)
    event: Event;

    @Column()
    place: string;

    @Column()
    dateHour?: Date;

    @Column()
    gps: string;

    @Column()
    price: number;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;   
}