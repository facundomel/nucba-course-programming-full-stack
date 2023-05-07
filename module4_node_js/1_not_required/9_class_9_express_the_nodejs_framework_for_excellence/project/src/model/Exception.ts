export default class Exception {
	statusCode: number;
	message: string;

	constructor(message: string, statusCode: number) {
		this.message = message;
		this.statusCode = statusCode;
	}
}
