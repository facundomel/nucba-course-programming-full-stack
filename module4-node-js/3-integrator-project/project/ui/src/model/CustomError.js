export default class CustomError {
	type = "";
	message = "";
	statusCode = "";

	constructor(type, message, statusCode) {
		this.type = type;
		this.message = message;
		this.statusCode = statusCode;
	}
}
