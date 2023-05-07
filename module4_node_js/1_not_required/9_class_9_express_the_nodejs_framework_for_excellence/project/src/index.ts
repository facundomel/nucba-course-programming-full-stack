import express from "express";
import Router from "./router/Router";
import { StatusCodes } from "http-status-codes";
import Exception from "./model/Exception";

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use("/api", Router.init());
app.all("*", (req, res) => {
	res.status(StatusCodes.NOT_FOUND).json(new Exception("URL Not Found", StatusCodes.NOT_FOUND));
});

app.listen(PORT, () => {
	console.log("🗲 Server running on port 3002 🗲");
});
