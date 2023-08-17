import express from "express";
import "dotenv/config";
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

class Main {
	static init = () => {
		const port = Config.getInstance().appPort;
		const app = express();

		app.use(express.json({ strict: false }));
		app.use(cors());

		app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
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
