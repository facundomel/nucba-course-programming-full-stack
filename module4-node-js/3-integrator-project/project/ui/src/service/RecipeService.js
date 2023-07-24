import Configs from "../configs/Configs";
import Utils from "../utils/Utils";
import axios from "axios";

export default class RecipeService {
	static utils = new Utils();
	static baseUrl = new Configs().baseUrlLocal;

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
