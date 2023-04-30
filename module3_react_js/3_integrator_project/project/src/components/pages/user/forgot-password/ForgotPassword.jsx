import React, { useEffect, useRef, useState } from "react";
import { ErrorContainer, ShowPassword, UserContainer, UserForm, UserLink } from "../UserStyles";
import Input from "../../../atomics/input/Input";
import Button from "../../../atomics/button/Button";
import { ERROR_EMAIL } from "../../../../model/ErrorCustom";
import { KEY_USER_SESSION } from "../../../../repository/LocalStorage";
import localStorage from "../../../../repository/LocalStorage";
import { isExistEmail, isValidEmail } from "./ForgotPasswordValidations";
import { useDispatch } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";

const ForgotPassword = () => {
	const emailRef = useRef();
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [userPassword, setUserPassword] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		emailRef.current.focus();
		dispatch(userActions.setUserSection("UserForgotPassword"));
	}, []);

	useEffect(() => {
		if (!error) return;

		setError(null);
	}, [email]);

	const handleChangeInputEmail = (e) => {
		setEmail(e.target.value);
	};

	const onSubmitForgotPassword = (e) => {
		e.preventDefault();

		if (!isValidEmail(email, setError, emailRef)) return;

		const user = localStorage.get(KEY_USER_SESSION) || null;

		if (!isExistEmail(user, email, setError, emailRef, userPassword, setUserPassword)) return;

		setUserPassword(user.password);
		emailRef.current.focus();
	};

	return (
		<UserContainer>
			<h1>Recuperá tu contraseña</h1>
			<UserForm onSubmit={onSubmitForgotPassword}>
				<ErrorContainer isBorder={error && error.type == ERROR_EMAIL ? true : false}>
					<Input
						name="email"
						type="text"
						placeholder="Email de recuperación"
						inputRef={emailRef}
						error={error}
						handleOnChange={handleChangeInputEmail}
					/>
				</ErrorContainer>
				{userPassword && (
					<ShowPassword>
						<p>Contraseña: {userPassword} </p>
						<small>Aclaración: Se la muestra por este medio solo para fines prácticos</small>
						<UserLink to="/login">
							<small>Ingresá a tu cuenta</small>
						</UserLink>
					</ShowPassword>
				)}
				<Button type="submit" width="100%">
					Recuperar
				</Button>
				{!userPassword && (
					<UserLink to="/login">
						<small>¿Ya te acordaste los datos? Ingresá</small>
					</UserLink>
				)}
			</UserForm>
		</UserContainer>
	);
};

export default ForgotPassword;
