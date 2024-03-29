import ErrorCustom, { ERROR_EMAIL, ERROR_NAME, ERROR_PASSWORD } from "../../../../model/ErrorCustom";

export const isValidName = (name, setError, nameRef) => {
	if (name == "") {
		setError(new ErrorCustom(ERROR_NAME, "Campo requerido"));
		nameRef.current.focus();
		return false;
	}
	return true;
};

export const isValidEmail = (email, setError, emailRef) => {
	if (email == "") {
		setError(new ErrorCustom(ERROR_EMAIL, "Campo requerido"));
		emailRef.current.focus();
		return false;
	}

	const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

	if (!regexEmail.test(email)) {
		setError(new ErrorCustom(ERROR_EMAIL, "Formato de email incorrecto"));
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

	const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

	if (!regexPassword.test(password)) {
		setError(
			new ErrorCustom(ERROR_PASSWORD, "El password debe contener como mínimo una letra minúscula, una mayúscula y un total de 8 caracteres")
		);
		return false;
	}
	return true;
};
