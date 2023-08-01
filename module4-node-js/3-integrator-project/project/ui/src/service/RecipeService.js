import Configs from "../configs/Configs";
import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import * as userActions from "../redux/user/UserActions.js";
import UserSession from "../model/UserSession";
import AuthService from "./AuthService";

export default class RecipeService {
	static utils = new Utils();
	static baseUrl = new Configs().baseUrlLocal;
	// static dispatch = useDispatch();

	static getRecipes = async () => {
		try {
			const response = await axios.get(`${this.baseUrl}/api/recipes`, {
				headers: this.utils.getHeadersDefault(),
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw err;
		}
	};

	static getRecipeById = async (recipeId, authToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${authToken.accessToken}`,
			};
			const response = await axios.get(`${this.baseUrl}/api/recipes/${recipeId}`, {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errResponseData = err.response?.data && this.utils.convertFromSnakeToCamel(err.response.data);
			if (
				errResponseData &&
				errResponseData.statusCode === HttpStatusCode.Unauthorized &&
				errResponseData.message === "Not authorized: Access token expired"
			) {
				try {
					let response = await AuthService.refreshToken(authToken.refreshToken, navigate, dispatch);
					response = await this.getRecipeById(recipeId, new UserSession(response).authToken, navigate, dispatch);
					return response;
				} catch (err) {
					console.log(err);
					throw err;
				}
			}
			console.log(err);
			throw err;
		}
	};

	static getRecipesFavoriteWithDetailsByUserId = async (currentUser, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.get(`${this.baseUrl}/api/recipes/favorite/${currentUser.user.id}/details`, {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errResponseData = err.response?.data && this.utils.convertFromSnakeToCamel(err.response.data);
			if (
				errResponseData &&
				errResponseData.statusCode === HttpStatusCode.Unauthorized &&
				errResponseData.message === "Not authorized: Access token expired"
			) {
				try {
					let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
					response = await this.getRecipesFavoriteWithDetailsByUserId(new UserSession(response), navigate, dispatch);
					return response;
				} catch (err) {
					throw err;
				}
			}
			throw err;
		}
	};

	static getRecipesFavoriteWithDetailsByUserIdAndRecipeId = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.get(`${this.baseUrl}/api/recipes/favorite/${recipeId}/${currentUser.user.id}/details`, {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errResponseData = err.response?.data && this.utils.convertFromSnakeToCamel(err.response.data);
			if (
				errResponseData &&
				errResponseData.statusCode === HttpStatusCode.Unauthorized &&
				errResponseData.message === "Not authorized: Access token expired"
			) {
				try {
					let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
					response = await this.getRecipesFavoriteWithDetailsByUserIdAndRecipeId(new UserSession(response), recipeId, navigate, dispatch);
					return response;
				} catch (err) {
					throw err;
				}
			}
			throw err;
		}
	};

	static createRecipe = async (recipe, authToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${authToken.accessToken}`,
			};

			const response = await axios.post(`${this.baseUrl}/api/recipes`, this.utils.convertFromCamelToSnake(recipe), {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errResponseData = err.response?.data && this.utils.convertFromSnakeToCamel(err.response.data);
			if (
				errResponseData &&
				errResponseData.statusCode === HttpStatusCode.Unauthorized &&
				errResponseData.message === "Not authorized: Access token expired"
			) {
				try {
					let response = await AuthService.refreshToken(authToken.refreshToken, navigate, dispatch);
					response = await this.createRecipe(recipe, new UserSession(response).authToken, navigate, dispatch);
					return response;
				} catch (err) {
					console.log(err);
					throw err;
				}
			}
			console.log(err);
			throw err;
		}
	};

	static createRecipeFavorite = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const recipeFavorite = {
				recipeId: recipeId,
				userId: currentUser.user.id,
			};
			const response = await axios.post(`${this.baseUrl}/api/recipes/favorite`, this.utils.convertFromCamelToSnake(recipeFavorite), {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errResponseData = err.response?.data && this.utils.convertFromSnakeToCamel(err.response.data);
			if (
				errResponseData &&
				errResponseData.statusCode === HttpStatusCode.Unauthorized &&
				errResponseData.message === "Not authorized: Access token expired"
			) {
				try {
					let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
					response = await this.createRecipeFavorite((new UserSession(response), recipeId, navigate, dispatch));
					return response;
				} catch (err) {
					console.log(err);
					throw err;
				}
			}
			console.log(err);
			throw err;
		}
	};

	static deleteRecipeFavorite = async (currentUser, recipeId, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.delete(`${this.baseUrl}/api/recipes/favorite/${recipeId}/${currentUser.user.id}`, {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errResponseData = err.response?.data && this.utils.convertFromSnakeToCamel(err.response.data);
			if (
				errResponseData &&
				errResponseData.statusCode === HttpStatusCode.Unauthorized &&
				errResponseData.message === "Not authorized: Access token expired"
			) {
				try {
					let response = await AuthService.refreshToken(currentUser.authToken.refreshToken, navigate, dispatch);
					response = await this.deleteRecipeFavorite((new UserSession(response), recipeId, navigate, dispatch));
					return response;
				} catch (err) {
					console.log(err);
					throw err;
				}
			}
			console.log(err);
			throw err;
		}
	};
}
