export default new (class ReqResService {
	getAllUsers() {
		return axios
			.get("https://reqres.in/api/users")
			.then((response) => {
				return response.data.data;
			})
			.catch((error) => {
				throw error;
			});
	}
})();
