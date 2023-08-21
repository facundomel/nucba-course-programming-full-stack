import express from "express";
import "dotenv/config";
import Database from "./repository/database/Database";
import UserRouter from "./router/UserRouter";
import { StatusCodes } from "http-status-codes";
import CustomException from "./model/CustomException";
import AuthRouter from "./router/AuthRouter";
import Config from "./config/Config";
import cors from "cors";
import RecipeRouter from "./router/RecipeRouter";
import RecipeCategoryRouter from "./router/RecipeCategoryRouter";
import RecipeFavoriteRouter from "./router/RecipeFavoriteRouter";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "../swagger-config";
import ResponseUtils from "./utils/ResponseUtils";
import PingRouter from "./router/PingRouter";
import RecipeFavoriteRepository from "./repository/RecipeFavoriteRepository";
import RecipeCategoryRepository from "./repository/RecipeCategoryRepository";
import RecipeRepository from "./repository/RecipeRepository";
import UserRepository from "./repository/UserRepository";
import UserRoleRepository from "./repository/UserRoleRepository";

class Main {
	static init = async () => {
		const port = Config.getInstance().appPort;
		const app = express();

		app.use(express.json({ strict: false }));
		app.use(cors());

		// Inicializar los repositorios antes de configurar las rutas
		try {
			await Database.initializeDatabaseConnection();
			const dataSource = Database.getDataSource();

			await RecipeCategoryRepository.initializeRepository(dataSource);
			await RecipeFavoriteRepository.initializeRepository(dataSource);
			await RecipeRepository.initializeRepository(dataSource);
			await UserRepository.initializeRepository(dataSource);
			await UserRoleRepository.initializeRepository(dataSource);
			// Aquí puedes hacer lo mismo para otros repositorios si es necesario
		} catch (error) {
			console.error("Failed to initialize repositories:", error);
			process.exit(1); // Salir de la aplicación si la inicialización falla
		}

		app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
		app.use("/api", PingRouter.init());
		app.use("/api", AuthRouter.init());
		app.use("/api", UserRouter.init());
		app.use("/api", RecipeCategoryRouter.init());
		app.use("/api", RecipeFavoriteRouter.init());
		app.use("/api", RecipeRouter.init());
		app.all("*", (req, res) => {
			ResponseUtils.notFound(res, new CustomException("URL not found", StatusCodes.NOT_FOUND));
		});

		app.listen(port, () => {
			console.log(`🗲 Server running on port ${port} 🗲`);
		});
	};
}

Main.init();
