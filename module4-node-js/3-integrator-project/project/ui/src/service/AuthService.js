import Configs from "../config/Config";
import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";
import * as userActions from "../redux/user/UserActions.js";
import * as snackbarActions from "../redux/snackbar/SnackbarActions.js";
import UserSession from "../model/UserSession";
import Config from "../config/Config";
import CustomException from "../model/CustomException";
import { UserErrorType } from "../model/enum/ErrorType";

export default class AuthService {
	static headersDefault = Config.HEADERS_DEFAULT;
	static baseUrl = Config.BASE_URL;

	static loginUser = async (userLogin) => {
		try {
			const response = await axios.post(`${this.baseUrl}/api/login`, Utils.convertFromCamelToSnake(userLogin), {
				headers: this.headersDefault,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errorData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errorData) {
				switch (errorData.statusCode) {
					case HttpStatusCode.BadRequest:
						if (errorData.message.includes("Email is not valid")) {
							throw new CustomException(UserErrorType.ERROR_EMAIL, "Formato de email incorrecto", errorData.statusCode);
						} else if (errorData.message === "Password is not valid") {
							throw new CustomException(UserErrorType.ERROR_PASSWORD, "Password incorrecto", HttpStatusCode.BadRequest);
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

			response = Utils.convertFromSnakeToCamel(response.data);
			dispatch(userActions.setCurrentUser(new UserSession(response)));
			return response;
		} catch (err) {
			const errData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errData && errData.statusCode === HttpStatusCode.Unauthorized && errData.message === "Not authorized: Refresh token expired") {
				dispatch(userActions.removeCurrentUser());
				navigate("/recetas/1");
				throw new CustomException("", "¡La sesión ha caducado!", errData.statusCode);
			}
			throw new CustomException("", "Ha ocurrido un error. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};
}
