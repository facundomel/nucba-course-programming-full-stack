import ErrorCustom, { ERROR_EMAIL, ERROR_EMAIL_OR_PASSWORD, ERROR_PASSWORD } from "../../../../model/ErrorCustom";

export const isValidEmail = (email, setError, emailRef) => {
	if (email == "") {
		setError(new ErrorCustom(ERROR_EMAIL, "Campo requerido"));
		emailRef.current.focus();
		return false;
	}
	return true;
};

export const isExistEmail = (userSoraged, email, setError, emailRef, userPassword, setUserPassword) => {
	if (userSoraged == null || userSoraged.email != email) {
		if (userPassword) setUserPassword(null);
		setError(new ErrorCustom(ERROR_EMAIL, "Email inexistente"));
		emailRef.current.focus();
		return false;
	}
	return true;
};
