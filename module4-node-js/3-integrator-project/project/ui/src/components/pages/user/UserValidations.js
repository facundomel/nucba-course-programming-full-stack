import CustomException from "../../../model/CustomException";
import { UserErrorType } from "../../../model/enum/ErrorType";

export const isValidEmail = (email, setError, emailRef, shouldApplyRegexValidation) => {
	if (email === "") {
		setError(new CustomException(UserErrorType.ERROR_EMAIL, "Campo requerido"));
		emailRef.current.focus();
		return false;
	}

	if (shouldApplyRegexValidation) {
		const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

		if (!regexEmail.test(email)) {
			setError(new CustomException(UserErrorType.ERROR_EMAIL, "Formato de email incorrecto"));
			emailRef.current.focus();
			return false;
		}
	}
	return true;
};

export const isValidFirstName = (firstName, setError, firstNameRef) => {
	if (firstName === "") {
		setError(new CustomException(UserErrorType.ERROR_FIRST_NAME, "Campo requerido"));
		firstNameRef.current.focus();
		return false;
	}

	return true;
};

export const isValidLastName = (lastName, setError, lastNameRef) => {
	if (lastName === "") {
		setError(new CustomException(UserErrorType.ERROR_LAST_NAME, "Campo requerido"));
		lastNameRef.current.focus();
		return false;
	}
	return true;
};

export const isValidPassword = (password, setError, passwordRef, shouldApplyRegexValidation) => {
	if (password === "") {
		setError(new CustomException(UserErrorType.ERROR_PASSWORD, "Campo requerido"));
		passwordRef.current.focus();
		return false;
	}

	if (shouldApplyRegexValidation) {
		const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

		if (!regexPassword.test(password)) {
			setError(
				new CustomException(
					UserErrorType.ERROR_PASSWORD,
					"El password debe contener como mínimo una letra minúscula, una mayúscula, un símbolo y un total de 8 caracteres"
				)
			);
			passwordRef.current.focus();
			return false;
		}
	}
	return true;
};
