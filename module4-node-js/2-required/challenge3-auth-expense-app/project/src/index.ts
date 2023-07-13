import express from "express";
import UsersRouter from "./router/UsersRouter";
import { StatusCodes } from "http-status-codes";
import Exception from "./model/Exception";
import ExpensesRouter from "./router/ExpensesRouter";
import ResponseUtils from "./utils/ResponseUtils";
import AuthRouter from "./router/AuthRouter";
import Config from "./config/Config";

class Main {
	static init = () => {
		Config.getInstance();

		const port = Config.getInstance().appPort;
		const app = express();

		app.use(express.json());

		app.use("/api", AuthRouter.init());
		app.use("/api", UsersRouter.init());
		app.use("/api", ExpensesRouter.init());
		app.all("*", (req, res) => {
			res.status(StatusCodes.NOT_FOUND).json(ResponseUtils.convertFromCamelToSnake(new Exception("URL not found", StatusCodes.NOT_FOUND)));
		});

		app.listen(port, () => {
			console.log(`🗲 Server running on port ${port} 🗲`);
		});
	};
}

Main.init();
