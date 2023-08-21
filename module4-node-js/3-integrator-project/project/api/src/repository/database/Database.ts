import "reflect-metadata";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { AppDataSource } from "./DataSource";
import RepositoryInitializer from "../config/RepositoryInitializer";

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

	private static dataSource: DataSource | null = null;

	static init = async () => {
		// Inicializar los repositorios antes de configurar las rutas
		try {
			await this.initializeDatabaseConnection();
			const dataSource = this.getDataSource();
			RepositoryInitializer.initializeRepositories(dataSource);
		} catch (error) {
			console.error("Failed to initialize repositories: ", error);
		}
	};

	private static initializeDatabaseConnection = async () => {
		if (!this.dataSource) {
			try {
				this.dataSource = await AppDataSource.initialize();
				console.log("Connection initialized with database...");
			} catch (error) {
				console.error("Failed to create connection with database: ", error);
				throw error;
			}
		}
	};

	private static getDataSource = (): DataSource => {
		if (!this.dataSource) {
			throw new Error("Database connection has not been initialized.");
		}
		return this.dataSource;
	};
}
