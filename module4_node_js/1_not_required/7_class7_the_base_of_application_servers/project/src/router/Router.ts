import http from "http";
import PokemonController from "../controller/PokemonController";
import { HttpStatusCode } from "axios";

export class Router {
	static init = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
		const urlParts = req.url?.split("/");

		if (urlParts !== undefined && req.method === "GET" && urlParts[1] === "pokemon" && urlParts[2] !== undefined && urlParts[2] != "") {
			return PokemonController.getPokemonById(req, res);
		} else {
			res.statusCode = HttpStatusCode.NotFound;
			res.end("URL NOT FOUND");
			return;
		}
	};
}
