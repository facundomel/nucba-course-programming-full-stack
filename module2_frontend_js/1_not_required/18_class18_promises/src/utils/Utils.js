export default new (class Utils {
	getHeaders() {
		return {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json;charset=UTF-8",
		};
	}
})();
