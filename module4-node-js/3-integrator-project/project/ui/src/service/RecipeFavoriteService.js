import axios, { HttpStatusCode } from "axios";
import Utils from "../utils/Utils";
import AuthService from "./AuthService";
import CustomException from "../model/CustomException";
import Config from "../config/Config";

export default class RecipeFavoriteService {
	static #headersDefault = Config.HEADERS_DEFAULT;
	static #baseUrl = Config.BASE_URL;

	static getRecipesFavoriteWithDetailsByUserId = async (currentUser, navigate, dispatch, offset, limit) => {
		try {
			const headers = {
				...this.#headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.get(
				`${this.#baseUrl}/api/recipes/favorite/${currentUser.user.id}/details?offset=${offset}&limit=${limit}`,
				{
					headers: headers,
				}
			);
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authenticated: Access token expired") {
				const userSession = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				const recipesFavorite = await this.getRecipesFavoriteWithDetailsByUserId(userSession, navigate, dispatch, offset, limit);
				return recipesFavorite;
			}
			throw new CustomException("", "Error al obtener las recetas favoritas. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static getRecipesFavoriteWithDetailsByUserIdAndRecipeId = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.#headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.get(`${this.#baseUrl}/api/recipes/favorite/${recipeId}/${currentUser.user.id}/details`, {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authenticated: Access token expired") {
				const userSession = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				const recipesFavorite = await this.getRecipesFavoriteWithDetailsByUserIdAndRecipeId(userSession, recipeId, navigate, dispatch);
				return recipesFavorite;
			}
			throw new CustomException("", "Error al obtener las recetas favoritas. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static createRecipeFavorite = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.#headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const dataRecipeFavoriteToCreate = {
				recipeId: recipeId,
				userId: currentUser.user.id,
			};
			const response = await axios.post(`${this.#baseUrl}/api/recipes/favorite`, Utils.convertFromCamelToSnake(dataRecipeFavoriteToCreate), {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authenticated: Access token expired") {
				const userSession = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				const recipeFavoriteCreated = await this.createRecipeFavorite(userSession, recipeId, navigate, dispatch);
				return recipeFavoriteCreated;
			}
			throw new CustomException("", "Error al crear la receta favorita. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static deleteRecipeFavorite = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.#headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.delete(`${this.#baseUrl}/api/recipes/favorite/${recipeId}/${currentUser.user.id}`, {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authenticated: Access token expired") {
				const userSession = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				const recipeFavoriteDeleted = await this.deleteRecipeFavorite(userSession, recipeId, navigate, dispatch);
				return recipeFavoriteDeleted;
			}
			throw new CustomException("", "Error al eliminar la receta favorita. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};
}
