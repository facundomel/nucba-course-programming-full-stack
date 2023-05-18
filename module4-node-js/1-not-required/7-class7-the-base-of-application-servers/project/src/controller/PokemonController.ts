import http from "http";
import PokemonService from "../service/PokemonService";
import { HttpStatusCode } from "axios";

export default class PokemonController {
	static getPokemonById = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
		try {
			const urlParts = req.url?.split("/");

			if (urlParts) {
				const result = await PokemonService.getPokemonById(Number(urlParts[3]));

				res.setHeader("content-type", "application/json");
				res.statusCode = HttpStatusCode.Ok;
				res.end(JSON.stringify(result));
				return;
			}
		} catch (error: any) {
			res.statusCode = error.response.status;
			res.end(error.message);
			return;
		}
	};
}
