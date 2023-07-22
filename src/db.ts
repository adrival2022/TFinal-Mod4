import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Event } from "./entity/Event";
import { Booking } from "./entity/Booking";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "mysql",
  database: "ticket-system-db",
  // logging: true, // muestra peticiones a la bd
  synchronize: true,
  entities: [User, Event, Booking],
});