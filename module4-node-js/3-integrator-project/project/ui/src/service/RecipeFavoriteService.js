import axios, { HttpStatusCode } from "axios";
import Utils from "../utils/Utils";
import AuthService from "./AuthService";
import UserSession from "../model/UserSession";
import CustomException from "../model/CustomException";
import Config from "../config/Config";

export default class RecipeFavoriteService {
	static headersDefault = Config.HEADERS_DEFAULT;
	static baseUrl = Config.BASE_URL;

	static getRecipesFavoriteWithDetailsByUserId = async (currentUser, navigate, dispatch, offset, limit) => {
		try {
			const headers = {
				...this.headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.get(
				`${this.baseUrl}/api/recipes/favorite/${currentUser.user.id}/details?offset=${offset}&limit=${limit}`,
				{
					headers: headers,
				}
			);
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authorized: Access token expired") {
				let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				response = await this.getRecipesFavoriteWithDetailsByUserId(new UserSession(response), navigate, dispatch);
				return response;
			}
			throw new CustomException("", "Error al obtener las recetas favoritas. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static getRecipesFavoriteWithDetailsByUserIdAndRecipeId = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.get(`${this.baseUrl}/api/recipes/favorite/${recipeId}/${currentUser.user.id}/details`, {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authorized: Access token expired") {
				let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				response = await this.getRecipesFavoriteWithDetailsByUserIdAndRecipeId(new UserSession(response), recipeId, navigate, dispatch);
				return response;
			}
			throw new CustomException("", "Error al obtener las recetas favoritas. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static createRecipeFavorite = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const recipeFavorite = {
				recipeId: recipeId,
				userId: currentUser.user.id,
			};
			const response = await axios.post(`${this.baseUrl}/api/recipes/favorite`, Utils.convertFromCamelToSnake(recipeFavorite), {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authorized: Access token expired") {
				let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				response = await this.createRecipeFavorite((new UserSession(response), recipeId, navigate, dispatch));
				return response;
			}
			throw new CustomException("", "Error al crear la receta favorita. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static deleteRecipeFavorite = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.headersDefault,
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.delete(`${this.baseUrl}/api/recipes/favorite/${recipeId}/${currentUser.user.id}`, {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authorized: Access token expired") {
				let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				response = await this.deleteRecipeFavorite((new UserSession(response), recipeId, navigate, dispatch));
				return response;
			}
			throw new CustomException("", "Error al eliminar la receta favorita. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};
}
