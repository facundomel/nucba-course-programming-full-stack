import ErrorCustom, { ERROR_EMAIL, ERROR_EMAIL_OR_PASSWORD, ERROR_PASSWORD } from "../../../../model/ErrorCustom";

export const isValidEmail = (
	email: string,
	setError: React.Dispatch<React.SetStateAction<ErrorCustom | null>>,
	emailRef: React.RefObject<HTMLInputElement>
) => {
	if (email == "") {
		setError(new ErrorCustom(ERROR_EMAIL, "Campo requerido"));
		emailRef.current?.focus();
		return false;
	}
	return true;
};

export const isValidPassword = (
	password: string,
	setError: React.Dispatch<React.SetStateAction<ErrorCustom | null>>,
	passwordRef: React.RefObject<HTMLInputElement>
) => {
	if (password == "") {
		setError(new ErrorCustom(ERROR_PASSWORD, "Campo requerido"));
		passwordRef.current?.focus();
		return false;
	}
	return true;
};

export const isValidEmailAndPassword = (
	user: any,
	email: string,
	password: string,
	setError: React.Dispatch<React.SetStateAction<ErrorCustom | null>>,
	emailRef: React.RefObject<HTMLInputElement>
) => {
	if (user == null || user.email != email || user.password != password) {
		setError(new ErrorCustom(ERROR_EMAIL_OR_PASSWORD, "Email o password incorrecto"));
		emailRef.current?.focus();
		return false;
	}
	return true;
};
