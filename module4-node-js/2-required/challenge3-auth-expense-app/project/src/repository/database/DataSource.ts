import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import User from "../../model/entity/User";
import Expense from "../../model/entity/Expense";
import "dotenv/config";
import { EmailUnique1689389603912 } from "./migrations/1689389603912-EmailUnique";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [User, Expense],
	migrations: [EmailUnique1689389603912],
	// migrationsRun: true,
	logging: false,
	logger: "simple-console",
	subscribers: [],
	ssl: { rejectUnauthorized: false },
	connectTimeout: 1500,
	maxQueryExecutionTime: 1500,
	namingStrategy: new SnakeNamingStrategy(),
	dropSchema: false,
	synchronize: false,
	// url: process.env.DATABASE_URL,
	// entities: ["src/model/entity/**/*.ts"],
	// migrations: ["src/repository/database/migrations/**/*{.ts}"]
});
