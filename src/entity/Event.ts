import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,    
    OneToMany,
  } from "typeorm";
import { Booking } from "./Booking";
  
  @Entity() // se puede pasar como parametro el nombre de tabla ej: 'eventsTable'
  export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => Booking, (booking) => booking.event)
    bookings: Booking[];

    @Column()
    name: string;
  
    @Column()
    description: string;

    @Column()
    place: string;

    @Column()
    dateHour?: Date;

    @Column()
    gps: string;

    @Column()
    price: number;

    @Column()
    limit: number;

    @Column()
    typeEvent: string;

    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn()
    createdAt?: Date;
  
    @UpdateDateColumn()
    updatedAt?: Date;
  }