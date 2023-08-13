// import CustomException from "../../../../model/CustomException";
// import { UserErrorType } from "../../../../model/enum/ErrorType";

// export const isValidEmail = (email, setError, emailRef) => {
// 	if (email === "") {
// 		setError(new CustomException(UserErrorType.ERROR_EMAIL, "Campo requerido"));
// 		emailRef.current.focus();
// 		return false;
// 	}

// 	const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

// 	if (!regexEmail.test(email)) {
// 		setError(new CustomException(UserErrorType.ERROR_EMAIL, "Formato de email incorrecto"));
// 		emailRef.current.focus();
// 		return false;
// 	}
// 	return true;
// };

// export const isExistEmail = (userSoraged, email, setError, emailRef, userPassword, setUserPassword) => {
// 	if (userSoraged == null || userSoraged.email !== email) {
// 		if (userPassword) setUserPassword(null);
// 		setError(new CustomException(UserErrorType.ERROR_EMAIL, "Email inexistente"));
// 		emailRef.current.focus();
// 		return false;
// 	}
// 	return true;
// };
