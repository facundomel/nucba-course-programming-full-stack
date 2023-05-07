export default class Config {
	static getPort = () => {
		return process.env.PORT || 3002;
	};
}
