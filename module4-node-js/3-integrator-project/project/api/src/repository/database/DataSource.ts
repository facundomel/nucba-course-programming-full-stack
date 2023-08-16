import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import User from "../../model/entity/User";
import { EmailUnique1689389603912 } from "./migrations/1689389603912-EmailUnique";
import UserRole from "../../model/entity/UserRole";
import Recipe from "../../model/entity/Recipe";
import RecipeCategory from "../../model/entity/RecipeCategory";
import RecipeFavorite from "../../model/entity/RecipesFavorite";

export const AppDataSource = new DataSource({
	type: process.env.DB_TYPE as any,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [User, UserRole, Recipe, RecipeCategory, RecipeFavorite],
	migrations: [EmailUnique1689389603912],
	// migrationsRun: true,
	logging: false,
	logger: "simple-console",
	subscribers: [],
	ssl: process.env.DB_HOST != "localhost" ? { rejectUnauthorized: false } : false,
	connectTimeout: 1500,
	connectTimeoutMS: 3000,
	maxQueryExecutionTime: 3000,
	namingStrategy: new SnakeNamingStrategy(),
	dropSchema: false,
	synchronize: false,
	// url: process.env.DATABASE_URL,
	// entities: ["src/model/entity/**/*.ts"],
	// migrations: ["src/repository/database/migrations/**/*{.ts}"]
});
