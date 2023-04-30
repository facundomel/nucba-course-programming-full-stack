export const ERROR_EMAIL = "ERROR_EMAIL";
export const ERROR_NAME = "ERROR_NAME";
export const ERROR_PASSWORD = "ERROR_PASSWORD";
export const ERROR_EMAIL_OR_PASSWORD = "ERROR_EMAIL_OR_PASSWORD";

export default class ErrorCustom extends Error {
	constructor(type, message) {
		super(message);
		this.type = type;
	}
}
