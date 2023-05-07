import express from "express";
import Router from "./router/Router";
import { StatusCodes } from "http-status-codes";
import Exception from "./model/Exception";
import Config from "./config/Config";

class Main {
	static init = () => {
		const app = express();

		app.use(express.json());
		app.use("/api", Router.init());
		app.all("*", (req, res) => {
			res.status(StatusCodes.NOT_FOUND).json(new Exception("URL Not Found", StatusCodes.NOT_FOUND));
		});
		app.listen(Config.getPort(), () => {
			console.log("🗲 Server running on port 3002 🗲");
		});
	};
}

Main.init();
