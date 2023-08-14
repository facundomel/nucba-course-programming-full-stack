import React, { useEffect, useRef, useState } from "react";
import Input from "../../../atomics/input/Input";
import {
	UserForm,
	UserContainer,
	UserLink,
	ErrorContainer,
	ErrorMessage,
	InputPasswordAndIconShowAndHideContainer,
	IconShowAndHidePasswordContainer,
} from "../UserStyles";
import Button from "../../../atomics/button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import { useNavigate } from "react-router-dom";
import { KEY_USER_SESSION } from "../../../../repository/LocalStorage";
import localStorage from "../../../../repository/LocalStorage";
import UserSession from "../../../../model/UserSession";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AuthService from "../../../../service/AuthService";
import { UserErrorType } from "../../../../model/enum/ErrorType";
import UserLogin from "../../../../model/UserLogin";
import RecipeService from "../../../../service/RecipeService";
import Utils from "../../../../utils/Utils";
import CustomException from "../../../../model/CustomException";
import { HttpStatusCode } from "axios";
import { isValidEmail, isValidPassword } from "../UserValidations";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import SnackbarUtils from "../../../../utils/SnackbarUtils";

const Login = () => {
	const [errorInput, setErrorInput] = useState(null);
	const [otherError, setOtherError] = useState(null);
	const [valueInputs, setValueInputs] = useState(new UserLogin());
	const [typeInputPassword, setTypeInputPassword] = useState("password");
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		emailRef.current.focus();
		dispatch(userActions.setUserSection("UserLogin"));
	}, []);

	useEffect(() => {
		if ((valueInputs.email !== "" || valueInputs.password !== "") && optionsSnackbar.message === "Contraseña actualizada correctamente") {
			dispatch(snackbarActions.setOptionsSnackbar({ ...optionsSnackbar, open: false }));
		}
		if (!errorInput && !otherError) return;
		if (errorInput) setErrorInput(null);
		if (otherError) setOtherError(null);
	}, [valueInputs]);

	const handleChangeInputs = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		if (name === "password" && value === "" && passwordRef.current.type === "text") {
			passwordRef.current.type = "password";
			setTypeInputPassword(passwordRef.current.type);
		}

		setValueInputs({ ...valueInputs, [name]: value });
	};

	const onSubmitLoginUser = async (e) => {
		e.preventDefault();

		if (!isValidEmail(valueInputs.email, setErrorInput, emailRef, false)) return;
		if (!isValidPassword(valueInputs.password, setErrorInput, passwordRef, false)) return;

		try {
			const response = await AuthService.loginUser(valueInputs);
			const currentUser = new UserSession(response);
			dispatch(userActions.setCurrentUser(currentUser));
			navigate("/recetas/1");
			SnackbarUtils.info(`¡Bienvenido nuevamente ${response.user.firstName}!`, 2500, dispatch);
		} catch (error) {
			if (error instanceof CustomException) {
				if (error.type === UserErrorType.ERROR_EMAIL) {
					setErrorInput(error);
					emailRef.current.focus();
				} else if (error.type === UserErrorType.ERROR_PASSWORD) {
					setErrorInput(error);
					passwordRef.current.focus();
				} else {
					setOtherError(error);
					SnackbarUtils.error(error, 2500, dispatch);
					emailRef.current.focus();
				}
			}
		}
	};

	const showPassword = (e) => {
		e.preventDefault();
		passwordRef.current.type = "text";
		setTypeInputPassword(passwordRef.current.type);
	};

	const hidePassword = (e) => {
		e.preventDefault();
		passwordRef.current.type = "password";
		setTypeInputPassword(passwordRef.current.type);
	};

	return (
		<>
			<UserContainer>
				<h1>Iniciar Sesión</h1>
				<UserForm onSubmit={onSubmitLoginUser}>
					<Input
						name="email"
						type="text"
						placeholder="Email"
						inputRef={emailRef}
						handleOnChange={handleChangeInputs}
						error={
							errorInput &&
							(errorInput.type === UserErrorType.ERROR_EMAIL || errorInput.type === UserErrorType.ERROR_EMAIL_OR_PASSWORD) &&
							errorInput
						}
					/>
					<InputPasswordAndIconShowAndHideContainer>
						<Input
							name="password"
							type="password"
							placeholder="Contraseña"
							paddingRight="3rem"
							inputRef={passwordRef}
							handleOnChange={handleChangeInputs}
							error={
								errorInput &&
								(errorInput.type === UserErrorType.ERROR_PASSWORD || errorInput.type === UserErrorType.ERROR_EMAIL_OR_PASSWORD) &&
								errorInput
							}
						/>

						<IconShowAndHidePasswordContainer
							type="button"
							onClick={(e) => {
								typeInputPassword === "password" ? showPassword(e) : hidePassword(e);
							}}
							valuePassword={valueInputs.password}
							disabled={valueInputs.password ? false : true}
							position="absolute"
						>
							{typeInputPassword === "password" || !valueInputs.password ? <AiFillEyeInvisible /> : <AiFillEye />}
						</IconShowAndHidePasswordContainer>
					</InputPasswordAndIconShowAndHideContainer>
					<Button type="submit" width="100%">
						Ingresar
					</Button>
					<UserLink to="/recuperar-contraseña">
						<small>¿Olvidaste la contraseña? Restablecela</small>
					</UserLink>
					<UserLink to="/registro">
						<small>¿No tenés cuenta? Registrate</small>
					</UserLink>
				</UserForm>
			</UserContainer>

			{otherError ||
				(optionsSnackbar.message === "Contraseña actualizada correctamente" && (
					<SnackbarCustom
						open={optionsSnackbar.open}
						onClose={() => dispatch(snackbarActions.setOptionsSnackbar({ ...optionsSnackbar, open: false }))}
						severity={optionsSnackbar.severity}
						message={optionsSnackbar.message}
						autoHideDuration={optionsSnackbar.autoHideDuration}
					/>
				))}
		</>
	);
};

export default Login;
