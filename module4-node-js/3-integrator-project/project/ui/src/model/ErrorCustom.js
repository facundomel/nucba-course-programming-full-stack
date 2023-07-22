export default class ErrorCustom extends Error {
	constructor(type, message) {
		super(message);
		this.type = type;
	}
}

export const ErrorType = {
	ERROR_EMAIL: "ERROR_EMAIL",
	ERROR_FIRST_NAME: "ERROR_FIRST_NAME",
	ERROR_LAST_NAME: "ERROR_LAST_NAME",
	ERROR_PASSWORD: "ERROR_PASSWORD",
	ERROR_EMAIL_OR_PASSWORD: "ERROR_EMAIL_OR_PASSWORD",
};
