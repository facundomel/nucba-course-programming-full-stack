import Config from "../config/Config";
import CustomException from "../model/CustomException";
import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";

export default class RecipeCategoryService {
	static #headersDefault = Config.HEADERS_DEFAULT;
	static #apiBaseUrl = Config.API_BASE_URL;

	static getRecipesCategories = async () => {
		try {
			const response = await axios.get(`${this.#apiBaseUrl}/api/recipes/categories`, {
				headers: this.#headersDefault,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw new CustomException(
				"",
				"Error al obtener las categorías de las recetas. Inténtelo más tarde",
				HttpStatusCode.InternalServerError
			);
		}
	};
}
