import ErrorCustom, { ERROR_EMAIL, ERROR_EMAIL_OR_PASSWORD, ERROR_PASSWORD } from "../../../../model/ErrorCustom";

export const isValidEmail = (email, setError, emailRef) => {
	if (email == "") {
		setError(new ErrorCustom(ERROR_EMAIL, "Campo requerido"));
		emailRef.current.focus();
		return false;
	}
	return true;
};

export const isValidPassword = (password, setError, passwordRef) => {
	if (password == "") {
		setError(new ErrorCustom(ERROR_PASSWORD, "Campo requerido"));
		passwordRef.current.focus();
		return false;
	}
	return true;
};

export const isValidEmailAndPassword = (user, email, password, setError, emailRef) => {
	if (user.email != email || user.password != password) {
		setError(new ErrorCustom(ERROR_EMAIL_OR_PASSWORD, "Email o password incorrecto"));
		emailRef.current.focus();
		return false;
	}
	return true;
};
