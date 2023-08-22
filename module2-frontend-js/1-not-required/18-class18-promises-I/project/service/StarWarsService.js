export default new (class StarWarsService {
	getAllCharacters() {
		return axios
			.get("https://swapi.py4e.com/api/people")
			.then((response) => {
				return response.data.results;
			})
			.catch((error) => {
				throw error;
			});
	}
})();
