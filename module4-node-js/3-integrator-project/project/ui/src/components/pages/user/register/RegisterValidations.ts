import ErrorCustom, { ERROR_EMAIL, ERROR_NAME, ERROR_PASSWORD } from "../../../../model/ErrorCustom";

export const isValidName = (
	name: string,
	setError: React.Dispatch<React.SetStateAction<ErrorCustom | null>>,
	nameRef: React.RefObject<HTMLInputElement>
) => {
	if (name == "") {
		setError(new ErrorCustom(ERROR_NAME, "Campo requerido"));
		nameRef.current?.focus();
		return false;
	}
	return true;
};

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

	const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

	if (!regexEmail.test(email)) {
		setError(new ErrorCustom(ERROR_EMAIL, "Formato de email incorrecto"));
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

	const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

	if (!regexPassword.test(password)) {
		setError(
			new ErrorCustom(ERROR_PASSWORD, "El password debe contener como mínimo una letra minúscula, una mayúscula y un total de 8 caracteres")
		);
		return false;
	}
	return true;
};
