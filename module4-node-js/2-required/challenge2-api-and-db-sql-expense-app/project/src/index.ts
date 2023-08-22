import express from "express";
import UsersRouter from "./router/UsersRouter";
import { StatusCodes } from "http-status-codes";
import Exception from "./model/Exception";
import "dotenv/config";
import ExpensesRouter from "./router/ExpensesRouter";
import ResponseUtils from "./utils/ResponseUtils";

class Main {
	static init = () => {
		const port = Number(process.env.APP_PORT);
		const app = express();

		app.use(express.json());
		app.use("/api", UsersRouter.init());
		app.use("/api", ExpensesRouter.init());
		app.all("*", (req, res) => {
			res.status(StatusCodes.NOT_FOUND).json(ResponseUtils.convertFromCamelToSnake(new Exception("URL Not Found", StatusCodes.NOT_FOUND)));
		});
		app.listen(port, () => {
			console.log(`🗲 Server running on port ${port} 🗲`);
		});
	};
}

Main.init();
