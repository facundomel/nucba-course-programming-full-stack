import Configs from "../configs/Configs";
import Utils from "../utils/Utils";
import axios from "axios";

export default class UserService {
	static utils = new Utils();
	static baseUrl = new Configs().baseUrlLocal;

	static registerUser = async (user) => {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users`, this.utils.convertFromCamelToSnake(user), {
				headers: this.utils.getHeadersDefault()
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw err;
		}
	};
}
