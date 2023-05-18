import http from "http";
import PokemonController from "../controller/PokemonController";
import { HttpStatusCode } from "axios";

export default class Router {
	static init = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
		const urlParts = req.url?.split("/");

		if (
			req.method === "GET" &&
			urlParts !== undefined &&
			urlParts[1] === "api" &&
			urlParts[2] === "pokemon" &&
			urlParts[3] !== undefined &&
			urlParts[3] != ""
		) {
			return PokemonController.getPokemonById(req, res);
		} else {
			res.statusCode = HttpStatusCode.NotFound;
			res.end("URL Not Found");
			return;
		}
	};
}
