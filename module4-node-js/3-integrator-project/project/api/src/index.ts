import express from "express";
import { StatusCodes } from "http-status-codes";
import CustomException from "./model/CustomException";
import ResponseUtils from "./utils/ResponseUtils";
import Config from "./config/Config";

class Main {
	static init = () => {
		Config.getInstance();

		const port = Config.getInstance().appPort;
		const app = express();

		app.use(express.json());

		app.use("/api", (req, res) => {
			res
				.status(StatusCodes.OK)
				.json(ResponseUtils.convertFromCamelToSnake(new CustomException("Hola desde la API", StatusCodes.OK)));
		});
		// app.use("/api", UsersRouter.init());
		// app.use("/api", ExpensesRouter.init());
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
