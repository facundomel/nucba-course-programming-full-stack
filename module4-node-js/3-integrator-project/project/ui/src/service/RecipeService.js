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

	static getRecipesFavoriteByUserId = async (currentUser, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${currentUser.authToken.accessToken}`,
			};
			const response = await axios.get(`${this.baseUrl}/api/recipes/favorite/${currentUser.user.id}`, {
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
					response = await this.getRecipesFavoriteByUserId(new UserSession(response), navigate, dispatch);
					return response;
				} catch (err) {
					throw err;
				}
			}
			throw err;
		}
	};

	static createRecipe = async (recipe, accessToken) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${accessToken}`,
			};

			const response = await axios.post(`${this.baseUrl}/api/recipes`, this.utils.convertFromCamelToSnake(recipe), {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw err;
		}
	};
}
