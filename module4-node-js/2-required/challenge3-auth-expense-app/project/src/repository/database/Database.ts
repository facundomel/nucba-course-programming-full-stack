import "reflect-metadata";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { AppDataSource } from "./DataSource";

export default class Database {
	static {
		AppDataSource.initialize()
			.then(async () => {
				console.log("Connection initialized with database...");
			})
			.catch((error: any) => {
				console.log(error);
			});
	}

	static getConnection = (delay = 3000): Promise<DataSource> => {
		if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (AppDataSource.isInitialized) resolve(AppDataSource);
				else reject("Failed to create connection with database");
			}, delay);
		});
	};
}
