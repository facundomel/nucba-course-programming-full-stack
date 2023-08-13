import express from "express";
import UsersRouter from "./router/UsersRouter";
import { StatusCodes } from "http-status-codes";
import CustomException from "./model/CustomException";
import ResponseUtils from "./utils/ResponseUtils";
import AuthRouter from "./router/AuthRouter";
import Config from "./config/Config";
import cors from "cors";
import RecipeRouter from "./router/RecipeRouter";
import RecipeCategoryRouter from "./router/RecipeCategoryRouter";
import RecipeFavoriteRouter from "./router/RecipeFavoriteRouter";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "../swagger-config"; // Importa la configuración de Swagger

class Main {
	static init = () => {
		Config.getInstance();

		const port = Config.getInstance().appPort;
		const app = express();

		app.use(express.json({ strict: false }));
		app.use(cors());

		app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
		app.use("/api", AuthRouter.init());
		app.use("/api", UsersRouter.init());
		app.use("/api", RecipeCategoryRouter.init());
		app.use("/api", RecipeFavoriteRouter.init());
		app.use("/api", RecipeRouter.init());
		app.all("*", (req, res) => {
			res
				.status(StatusCodes.NOT_FOUND)
				.json(ResponseUtils.convertFromCamelToSnake(new CustomException("URL not found", StatusCodes.NOT_FOUND)));
		});

		app.listen(port, () => {
			console.log(`🗲 Server running on port ${port} 🗲`);
		});
	};
}

Main.init();
