import Configs from "../configs/Configs";
import Utils from "../utils/Utils";
import axios from "axios";

export default class AuthService {
	static utils = new Utils();
	static baseUrl = new Configs().baseUrlLocal;

	static loginUser = async (userLogin) => {
		try {
			const response = await axios.post(`${this.baseUrl}/api/login`, this.utils.convertFromCamelToSnake(userLogin), {
				headers: this.utils.getHeaders()
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw err;
		}
	};
}
