import Config from "../config/Config";
import CustomException from "../model/CustomException";
import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";

export default class UserService {
	static headersDefault = Config.HEADERS_DEFAULT;
	static baseUrl = Config.BASE_URL;

	static registerUser = async (user) => {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users`, Utils.convertFromCamelToSnake(user), {
				headers: this.headersDefault,
			});
			return Utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw new CustomException("", "Error al registrarse", HttpStatusCode.InternalServerError);
		}
	};
}
