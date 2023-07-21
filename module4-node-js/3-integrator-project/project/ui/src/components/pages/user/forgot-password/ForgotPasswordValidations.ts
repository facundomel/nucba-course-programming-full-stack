import ErrorCustom, { ERROR_EMAIL } from "../../../../model/ErrorCustom";

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

export const isExistEmail = (
	userStorage: any,
	email: string,
	setError: React.Dispatch<React.SetStateAction<ErrorCustom | null>>,
	emailRef: React.RefObject<HTMLInputElement>,
	userPassword: string | null,
	setUserPassword: React.Dispatch<React.SetStateAction<string | null>>
) => {
	if (userStorage == null || userStorage.email != email) {
		if (userPassword) setUserPassword(null);
		setError(new ErrorCustom(ERROR_EMAIL, "Email inexistente"));
		emailRef.current?.focus();
		return false;
	}
	return true;
};
