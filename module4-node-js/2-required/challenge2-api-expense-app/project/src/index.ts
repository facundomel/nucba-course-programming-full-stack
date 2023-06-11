import express from "express";
import Router from "./router/Router";
import { StatusCodes } from "http-status-codes";
import Exception from "./model/Exception";
import "dotenv/config";

class Main {
	static init = () => {
		const port = Number(process.env.APP_PORT);
		const app = express();

		app.use(express.json());
		app.use("/api", Router.init());
		app.all("*", (req, res) => {
			res.status(StatusCodes.NOT_FOUND).json(new Exception("URL Not Found", StatusCodes.NOT_FOUND));
		});
		app.listen(port, () => {
			console.log(`🗲 Server running on port ${port} 🗲`);
		});
	};
}

Main.init();
