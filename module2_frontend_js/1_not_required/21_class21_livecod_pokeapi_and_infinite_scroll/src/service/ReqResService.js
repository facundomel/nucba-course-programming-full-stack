export default new (class ReqResService {
	async getAllUsers() {
		try {
			const result = await axios.get("https://reqres.in/api/users");
			return result.data.data;
		} catch (error) {
			throw error;
		}
	}
})();
