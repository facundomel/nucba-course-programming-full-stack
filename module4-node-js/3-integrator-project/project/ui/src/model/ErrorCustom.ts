export const ERROR_EMAIL = "ERROR_EMAIL";
export const ERROR_NAME = "ERROR_NAME";
export const ERROR_PASSWORD = "ERROR_PASSWORD";
export const ERROR_EMAIL_OR_PASSWORD = "ERROR_EMAIL_OR_PASSWORD";

export default class ErrorCustom extends Error {
	type: string;

	constructor(type: string, message: string) {
		super(message);
		this.type = type;
	}
}
