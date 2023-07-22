import ErrorCustom, { ErrorType } from "../../../../model/ErrorCustom";

export const isValidEmail = (email, setError, emailRef) => {
	if (email === "") {
		setError(new ErrorCustom(ErrorType.ERROR_EMAIL, "Campo requerido"));
		emailRef.current.focus();
		return false;
	}
	return true;
};

export const isExistEmail = (userSoraged, email, setError, emailRef, userPassword, setUserPassword) => {
	if (userSoraged == null || userSoraged.email !== email) {
		if (userPassword) setUserPassword(null);
		setError(new ErrorCustom(ErrorType.ERROR_EMAIL, "Email inexistente"));
		emailRef.current.focus();
		return false;
	}
	return true;
};
