import { DataSource } from "typeorm";
import 'dotenv/config'
import 'reflect-metadata'


export const connection = new DataSource({
   type: "mysql",
   database: process.env.DATABASE as string,
   host: process.env.HOST,
   port: process.env.DB_PORT as unknown as number,
   username: "root",
   password: process.env.PASSWORD,
   migrations: ['./src/migrations'],
   entities: ['./src/models/**.{ts,js}'],
   logging: true,
   synchronize: true
}) 