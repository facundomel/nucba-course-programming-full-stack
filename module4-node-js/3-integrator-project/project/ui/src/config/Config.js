export default class Config {
	static BASE_URL = process.env.REACT_APP_BASE_URL;

	static HEADERS_DEFAULT = { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" };
}
