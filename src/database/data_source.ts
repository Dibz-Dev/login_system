import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.APP_HOST,
  port: Number(process.env.APP_DB_PORT),
  username: process.env.APP_USERNAME,
  database: process.env.APP_DB,
  synchronize: false,
  logging: true,
  entities: ["src/modules/**/model.ts"],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
