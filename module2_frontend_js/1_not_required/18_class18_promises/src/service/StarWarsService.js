import Utils from "../utils/Utils.js";

export default new (class StarWarsService {
	getAllCharacters() {
		const options = {
			method: "get",
			headers: Utils.getHeaders(),
			credentials: "same-origin",
		};
		return axios
			.get("https://swapi.py4e.com/api/people", options)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				throw error;
			});
	}
})();