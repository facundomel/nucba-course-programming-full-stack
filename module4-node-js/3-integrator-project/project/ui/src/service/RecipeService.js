import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";
import AuthService from "./AuthService";
import Config from "../config/Config";
import CustomException from "../model/CustomException";

export default class RecipeService {
	static #headersDefault = Config.HEADERS_DEFAULT;
	static #baseUrl = Config.BASE_URL;

	static getRecipes = async (offset, limit) => {
		try {
			const response = await axios.get(`${this.#baseUrl}/api/recipes?offset=${offset}&limit=${limit}`, {
				headers: this.#headersDefault,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw new CustomException("", "Error al obtener las recetas. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static getRecipeById = async (recipeId, authToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.#headersDefault,
				authorization: `Bearer ${authToken.accessToken}`,
			};
			const response = await axios.get(`${this.#baseUrl}/api/recipes/${recipeId}`, {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authenticated: Access token expired") {
				const userSession = await AuthService.refreshToken(authToken.refreshToken, navigate, dispatch);
				const recipe = await this.getRecipeById(recipeId, userSession.authToken, navigate, dispatch);
				return recipe;
			}
			throw new CustomException("", "Error al obtener la receta. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static createRecipe = async (recipe, authToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.#headersDefault,
				authorization: `Bearer ${authToken.accessToken}`,
			};

			const response = await axios.post(`${this.#baseUrl}/api/recipes`, Utils.convertFromCamelToSnake(recipe), {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authenticated: Access token expired") {
				const userSession = await AuthService.refreshToken(authToken.refreshToken, navigate, dispatch);
				const recipeCreated = await this.createRecipe(recipe, userSession.authToken, navigate, dispatch);
				return recipeCreated;
			}
			throw new CustomException("", "Error al crear la receta. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};
}
