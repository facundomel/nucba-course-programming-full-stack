import React, { useEffect, useRef, useState } from "react";
import Input from "../../../atomics/input/Input";
import {
	UserForm,
	UserContainer,
	UserLink,
	InputPasswordAndIconShowAndHideContainer,
	IconShowAndHidePasswordContainer,
	TextButtonAndSpinner,
} from "../UserStyles";
import Button from "../../../atomics/button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions";
import { useNavigate } from "react-router-dom";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AuthService from "../../../../service/AuthService";
import { UserErrorType } from "../../../../model/enum/ErrorType";
import UserLogin from "../../../../model/UserLogin";
import CustomException from "../../../../model/CustomException";
import { isValidEmail, isValidPassword } from "../UserValidations";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import { UserPageSection } from "../../../../model/enum/PageSection";
import { SpinnerCustom } from "../../../atomics/spinner/SpinnerCustom";

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
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
		dispatch(userActions.setUserSection(UserPageSection.UserLogin));
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
			setLoading(true);
			const userSession = await AuthService.loginUser(valueInputs);
			dispatch(userActions.setCurrentUser(userSession));
			navigate("/recetas/1");
			SnackbarUtils.info(`¡Bienvenido nuevamente ${userSession.user.firstName}!`, 2500, dispatch);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		} catch (error) {
			if (error instanceof CustomException) {
				setTimeout(() => {
					setLoading(false);
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
				}, 500);
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
						<TextButtonAndSpinner>
							Ingresar {loading && <SpinnerCustom size={"1.2rem"} gap={"0px"} height={"0px"} color={"var(--black)"} />}
						</TextButtonAndSpinner>
					</Button>
					<UserLink to="/restablecer-contraseña">
						<small>¿Olvidaste la contraseña? Restablecela</small>
					</UserLink>
					<UserLink to="/registro">
						<small>¿No tenés cuenta? Registrate</small>
					</UserLink>
				</UserForm>
			</UserContainer>

			{(otherError || optionsSnackbar.message === "Contraseña actualizada correctamente") && (
				<SnackbarCustom
					open={optionsSnackbar.open}
					onClose={() => dispatch(snackbarActions.setOptionsSnackbar({ ...optionsSnackbar, open: false }))}
					severity={optionsSnackbar.severity}
					message={optionsSnackbar.message}
					autoHideDuration={optionsSnackbar.autoHideDuration}
				/>
			)}
		</>
	);
};

export default Login;
