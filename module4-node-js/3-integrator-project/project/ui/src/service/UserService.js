import Config from "../config/Config";
import CustomException from "../model/CustomException";
import { UserErrorType } from "../model/enum/ErrorType";
import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";

export default class UserService {
	static #headersDefault = Config.HEADERS_DEFAULT;
	static #apiBaseUrl = Config.API_BASE_URL;

	static getUserByEmail = async (email) => {
		try {
			const response = await axios.get(`${this.#apiBaseUrl}/api/users/search?email=${email}`, {
				headers: this.#headersDefault,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errorData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errorData && errorData.statusCode === HttpStatusCode.NotFound && errorData.message === "User not found") {
				throw new CustomException(UserErrorType.ERROR_EMAIL, "Email incorrecto", errorData.statusCode);
			}
			throw new CustomException("", "Error al validar el email. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static registerUser = async (user) => {
		try {
			const response = await axios.post(`${this.#apiBaseUrl}/api/users`, Utils.convertFromCamelToSnake(user), {
				headers: this.#headersDefault,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errorData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errorData && errorData.statusCode === HttpStatusCode.BadRequest && errorData.message.includes("Email is not valid")) {
				throw new CustomException(UserErrorType.ERROR_EMAIL, "Formato de email incorrecto", errorData.statusCode);
			} else if (errorData && errorData.statusCode === HttpStatusCode.BadRequest && errorData.message.includes("Password is not strong")) {
				throw new CustomException(
					UserErrorType.ERROR_PASSWORD,
					"El password debe contener como mínimo una letra minúscula, una mayúscula, un símbolo y un total de 8 caracteres",
					errorData.statusCode
				);
			} else if (errorData && errorData.statusCode === HttpStatusCode.Conflict && errorData.message === "User already exist") {
				throw new CustomException(UserErrorType.ERROR_EMAIL, "El email ya se encuentra en uso", errorData.statusCode);
			}
			throw new CustomException("", "Error al registrarse. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};

	static updateUserPassword = async (userId, newPassword) => {
		try {
			const response = await axios.put(
				`${this.#apiBaseUrl}/api/users/password`,
				Utils.convertFromCamelToSnake({ userId: userId, newPassword: newPassword }),
				{
					headers: this.#headersDefault,
				}
			);
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			const errorData = Utils.convertFromSnakeToCamel(err.response?.data);
			if (errorData && errorData.statusCode === HttpStatusCode.BadRequest && errorData.message.includes("New password is not strong")) {
				throw new CustomException(
					UserErrorType.ERROR_PASSWORD,
					"El password debe contener como mínimo una letra minúscula, una mayúscula, un símbolo y un total de 8 caracteres",
					errorData.statusCode
				);
			}
			throw new CustomException("", "Error al actualizar la contraseña. Inténtelo más tarde", HttpStatusCode.InternalServerError);
		}
	};
}
