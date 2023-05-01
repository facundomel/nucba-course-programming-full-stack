import React, { useEffect, useRef, useState } from "react";
import Input from "../../../atomics/input/Input";
import { UserForm, UserContainer, UserLink } from "../UserStyles";
import Button from "../../../atomics/button/Button";
import ErrorCustom, { ERROR_EMAIL, ERROR_NAME, ERROR_PASSWORD } from "../../../../model/ErrorCustom";
import localStorage, { KEY_USER_SESSION } from "../../../../repository/LocalStorage.js";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidName, isValidPassword } from "./RegisterValidations";
import { useDispatch } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import UserSession from "../../../../model/UserSession";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions.js";

const Register = () => {
	const [error, setError] = useState(null);
	const [valueInputs, setValueInputs] = useState({ name: "", email: "", password: "" });
	let nameRef = useRef();
	let emailRef = useRef();
	let passwordRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		nameRef.current.focus();
		dispatch(userActions.setUserSection("UserRegister"));
	}, []);

	useEffect(() => {
		if (!error) return;

		setError(null);
	}, [valueInputs]);

	const handleChangeInputs = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setValueInputs({ ...valueInputs, [name]: value });
	};

	const onSubmitCreateUser = (e) => {
		e.preventDefault();

		if (!isValidName(valueInputs.name, setError, nameRef)) return;
		if (!isValidEmail(valueInputs.email, setError, emailRef)) return;
		if (!isValidPassword(valueInputs.password, setError, passwordRef)) return;

		const user = localStorage.get(KEY_USER_SESSION) || null;

		if (user != null && user.email == valueInputs.email) {
			setError(new ErrorCustom(ERROR_EMAIL, "El email ya se encuentra en uso"));
			emailRef.current.focus();
			return;
		}

		localStorage.save(KEY_USER_SESSION, valueInputs);
		dispatch(userActions.setCurrentUser(new UserSession(valueInputs)));
		navigate("/");
		dispatch(
			snackbarActions.setOptionsSnackbar({
				open: true,
				severity: "success",
				message: `¡Felicitaciones ${valueInputs.name}! Se ha registrado correctamente`,
				autoHideDuration: 2500,
			})
		);
	};

	return (
		<UserContainer>
			<h1>Creá tu cuenta</h1>
			<UserForm onSubmit={onSubmitCreateUser}>
				<Input
					name="name"
					type="text"
					placeholder="Nombre"
					inputRef={nameRef}
					handleOnChange={handleChangeInputs}
					error={error && error.type == ERROR_NAME && error}
				/>
				<Input
					name="email"
					type="text"
					placeholder="Email"
					inputRef={emailRef}
					handleOnChange={handleChangeInputs}
					error={error && error.type == ERROR_EMAIL && error}
				/>
				<Input
					name="password"
					type="password"
					placeholder="Password"
					inputRef={passwordRef}
					handleOnChange={handleChangeInputs}
					error={error && error.type == ERROR_PASSWORD && error}
				/>
				<Button type="submit" width="100%">
					Registrar
				</Button>
				<UserLink to="/login">
					<small>¿Ya tenés cuenta? Iniciá sesión</small>
				</UserLink>
			</UserForm>
		</UserContainer>
	);
};

export default Register;
