import Configs from "../config/Config";
import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import * as userActions from "../redux/user/UserActions.js";
import UserSession from "../model/UserSession";
import AuthService from "./AuthService";
import Config from "../config/Config";
import CustomException from "../model/CustomException";

export default class RecipeService {
	static headersDefault = Config.HEADERS_DEFAULT;
	static baseUrl = Config.BASE_URL;

	static getRecipes = async (offset, limit) => {
		try {
			const response = await axios.get(`${this.baseUrl}/api/recipes?offset=${offset}&limit=${limit}`, {
				headers: this.headersDefault,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw new CustomException("", "Error al obtener las recetas. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static getRecipeById = async (recipeId, authToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.headersDefault,
				authorization: `Bearer ${authToken.accessToken}`,
			};
			const response = await axios.get(`${this.baseUrl}/api/recipes/${recipeId}`, {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (
				errData &&
				errData.statusCode === HttpStatusCode.Unauthorized &&
				errData.message === "Not authorized: Access token expired"
			) {
				let response = await AuthService.refreshToken(authToken.refreshToken, navigate, dispatch);
				response = await this.getRecipeById(recipeId, new UserSession(response).authToken, navigate, dispatch);
				return response;
			}
			throw new CustomException("", "Error al obtener la receta. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

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
			if (
				errData &&
				errData.statusCode === HttpStatusCode.Unauthorized &&
				errData.message === "Not authorized: Access token expired"
			) {
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
			if (
				errData &&
				errData.statusCode === HttpStatusCode.Unauthorized &&
				errData.message === "Not authorized: Access token expired"
			) {
				let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				response = await this.getRecipesFavoriteWithDetailsByUserIdAndRecipeId(new UserSession(response), recipeId, navigate, dispatch);
				return response;
			}
			throw new CustomException("", "Error al obtener las recetas favoritas. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static createRecipe = async (recipe, authToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.headersDefault,
				authorization: `Bearer ${authToken.accessToken}`,
			};

			const response = await axios.post(`${this.baseUrl}/api/recipes`, Utils.convertFromCamelToSnake(recipe), {
				headers: headers,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (
				errData &&
				errData.statusCode === HttpStatusCode.Unauthorized &&
				errData.message === "Not authorized: Access token expired"
			) {
				let response = await AuthService.refreshToken(authToken.refreshToken, navigate, dispatch);
				response = await this.createRecipe(recipe, new UserSession(response).authToken, navigate, dispatch);
				return response;
			}
			throw new CustomException("", "Error al crear la receta. Inténtelo más tarde", HttpStatusCode.InternalServerError);
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
			if (
				errData &&
				errData.statusCode === HttpStatusCode.Unauthorized &&
				errData.message === "Not authorized: Access token expired"
			) {
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
			if (
				errData &&
				errData.statusCode === HttpStatusCode.Unauthorized &&
				errData.message === "Not authorized: Access token expired"
			) {
				let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
				response = await this.deleteRecipeFavorite((new UserSession(response), recipeId, navigate, dispatch));
				return response;
			}
			throw new CustomException("", "Error al eliminar la receta favorita. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};
}
