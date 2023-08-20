import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";
import * as userActions from "../redux/user/UserActions.js";
import Config from "../config/Config";
import CustomException from "../model/CustomException";
import { UserErrorType } from "../model/enum/ErrorType";
import jwtDecode from "jwt-decode";
import UserSession from "../model/UserSession";

export default class AuthService {
	static headersDefault = Config.HEADERS_DEFAULT;
	static baseUrl = Config.BASE_URL;

	static loginUser = async (userLogin) => {
		try {
			const response = await axios.post(`${this.baseUrl}/api/login`, Utils.convertFromCamelToSnake(userLogin), {
				headers: this.headersDefault,
			});
			const responseData = Utils.convertFromSnakeToCamel(response.data);
			const decodedToken = jwtDecode(responseData.accessToken);
			return new UserSession(decodedToken, responseData);
		} catch (err) {
			const errorData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errorData) {
				switch (errorData.statusCode) {
					case HttpStatusCode.BadRequest:
						if (errorData.message.includes("Email is not valid")) {
							throw new CustomException(UserErrorType.ERROR_EMAIL, "Formato de email incorrecto", errorData.statusCode);
						} else if (errorData.message === "Password is not valid") {
							throw new CustomException(UserErrorType.ERROR_PASSWORD, "Password incorrecto", errorData.statusCode);
						}
						break;

					case HttpStatusCode.NotFound:
						if (errorData.message === "User not found") {
							throw new CustomException(UserErrorType.ERROR_EMAIL, "Email incorrecto", errorData.statusCode);
						}
						break;

					default:
						throw new CustomException("", "Ha ocurrido un error. Inténtelo más tarde", HttpStatusCode.InternalServerError);
				}
			} else {
				throw new CustomException("", "Ha ocurrido un error. Inténtelo más tarde", HttpStatusCode.InternalServerError);
			}
		}
	};

	static refreshToken = async (refreshToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.headersDefault,
				authorization: `Bearer ${refreshToken}`,
			};
			let response = await axios.post(`${this.baseUrl}/api/refresh-token`, null, {
				headers: headers,
			});
			const responseData = Utils.convertFromSnakeToCamel(response.data);
			const decodedToken = jwtDecode(responseData.accessToken);
			const userSession = new UserSession(decodedToken, responseData);
			dispatch(userActions.setCurrentUser(userSession));
			return userSession;
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authenticated: Refresh token expired") {
				dispatch(userActions.removeCurrentUser());
				navigate("/recetas/1");
				throw new CustomException("", "¡La sesión ha caducado!", errData.statusCode);
			}
			throw new CustomException("", "Ha ocurrido un error. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};
}
