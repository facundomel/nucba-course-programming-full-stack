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

export const isExistEmail = (userSoraged, email, setError, emailRef, userPassword, setUserPassword) => {
	if (userSoraged == null || userSoraged.email !== email) {
		if (userPassword) setUserPassword(null);
		setError(new CustomError(UserErrorType.ERROR_EMAIL, "Email inexistente"));
		emailRef.current.focus();
		return false;
	}
	return true;
};
