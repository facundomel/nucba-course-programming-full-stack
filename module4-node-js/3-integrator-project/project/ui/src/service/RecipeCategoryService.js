import Configs from "../configs/Configs";
import Utils from "../utils/Utils";
import axios from "axios";

export default class RecipeCategoryService {
	static utils = new Utils();
	static baseUrl = new Configs().baseUrlLocal;

	static getRecipesCategory = async (accessToken) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${accessToken}`,
			};

			const response = await axios.get(`${this.baseUrl}/api/recipes/categories`, {
				headers: headers,
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw err;
		}
	};
}