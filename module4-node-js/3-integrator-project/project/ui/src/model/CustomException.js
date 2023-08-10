export default class CustomException {
	type = "";
	message = "";
	statusCode = "";

	constructor(type, message, statusCode) {
		this.type = type;
		this.message = message;
		this.statusCode = statusCode;
	}
}
