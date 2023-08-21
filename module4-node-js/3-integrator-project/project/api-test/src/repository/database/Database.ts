import "reflect-metadata";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { AppDataSource } from "./DataSource";

export default class Database {
	// static {
	// 	AppDataSource.initialize()
	// 		.then(async () => {
	// 			console.log("Connection initialized with database...");
	// 		})
	// 		.catch((error: any) => {
	// 			console.log(error);
	// 		});
	// }

	// static getConnection = (delay = 3000): Promise<DataSource> => {
	// 	if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(() => {
	// 			if (AppDataSource.isInitialized) resolve(AppDataSource);
	// 			else reject("Failed to create connection with database");
	// 		}, delay);
	// 	});
	// };

	private static initialized = false;
	private static dataSource: DataSource | null = null;

	static async initializeDatabaseConnection(): Promise<void> {
		if (!Database.initialized) {
			try {
				Database.dataSource = await AppDataSource.initialize();
				console.log("Connection initialized with database...");
				Database.initialized = true;
			} catch (error) {
				console.error("Failed to create connection with database", error);
				throw error;
			}
		}
	}

  static getDataSource(): DataSource {
    if (!Database.dataSource) {
      throw new Error("Database connection has not been initialized.");
    }
    return Database.dataSource;
  }
}
