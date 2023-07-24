import CustomError from "../../../../model/CustomError";
import { UserErrorType } from "../../../../model/enum/ErrorType";

export const isValidEmail = (email, setError, emailRef) => {
	if (email === "") {
		setError(new CustomError(UserErrorType.ERROR_EMAIL, "Campo requerido"));
		emailRef.current.focus();
		return false;
	}
	return true;
};

export const isValidPassword = (password, setError, passwordRef) => {
	if (password === "") {
		setError(new CustomError(UserErrorType.ERROR_PASSWORD, "Campo requerido"));
		passwordRef.current.focus();
		return false;
	}
	return true;
};

export const isValidEmailAndPassword = (user, email, password, setError, emailRef) => {
	if (user == null || user.email !== email || user.password !== password) {
		setError(new CustomError(UserErrorType.ERROR_EMAIL_OR_PASSWORD, "Email o password incorrecto"));
		emailRef.current.focus();
		return false;
	}
	return true;
};
