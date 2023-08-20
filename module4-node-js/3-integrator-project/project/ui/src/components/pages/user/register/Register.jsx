import React, { useEffect, useRef, useState } from "react";
import Input from "../../../atomics/input/Input";
import {
	UserForm,
	UserContainer,
	UserLink,
	InputPasswordAndIconShowAndHideContainer,
	IconShowAndHidePasswordContainer,
} from "../UserStyles";
import Button from "../../../atomics/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions.js";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import UserService from "../../../../service/UserService";
import User from "../../../../model/User";
import { HttpStatusCode } from "axios";
import { UserErrorType } from "../../../../model/enum/ErrorType";
import AuthService from "../../../../service/AuthService";
import UserLogin from "../../../../model/UserLogin";
import Utils from "../../../../utils/Utils";
import CustomException from "../../../../model/CustomException";
import { isValidEmail, isValidFirstName, isValidLastName, isValidPassword } from "../UserValidations";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import { UserPageSection } from "../../../../model/enum/PageSection";

const Register = () => {
	const [errorInput, setErrorInput] = useState(null);
	const [otherError, setOtherError] = useState(null);
	const [valueInputs, setValueInputs] = useState(new User());
	const [typeInputPassword, setTypeInputPassword] = useState("password");
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { optionsSnackbar } = useSelector((state) => state.snackbar);

	useEffect(() => {
		firstNameRef.current.focus();
		dispatch(userActions.setUserSection(UserPageSection.UserRegister));
	}, []);

	useEffect(() => {
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

	const onSubmitCreateUser = async (e) => {
		e.preventDefault();

		if (!isValidFirstName(valueInputs.firstName, setErrorInput, firstNameRef)) return;
		if (!isValidLastName(valueInputs.lastName, setErrorInput, lastNameRef)) return;
		if (!isValidEmail(valueInputs.email, setErrorInput, emailRef, true)) return;
		if (!isValidPassword(valueInputs.password, setErrorInput, passwordRef, true)) return;

		try {
			const userRegistered = await UserService.registerUser(valueInputs);
			const userSession = await AuthService.loginUser(new UserLogin(valueInputs.email, valueInputs.password));
			dispatch(userActions.setCurrentUser(userSession));
			navigate("/recetas/1");
			SnackbarUtils.success(`¡Felicitaciones ${userRegistered.user.firstName}! Se ha registrado correctamente`, 2500, dispatch);
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
					firstNameRef.current.focus();
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
				<h1>Creá tu cuenta</h1>
				<UserForm onSubmit={onSubmitCreateUser}>
					<Input
						name="firstName"
						type="text"
						placeholder="Nombre"
						inputRef={firstNameRef}
						handleOnChange={handleChangeInputs}
						error={errorInput && errorInput.type === UserErrorType.ERROR_FIRST_NAME && errorInput}
					/>
					<Input
						name="lastName"
						type="text"
						placeholder="Apellido"
						inputRef={lastNameRef}
						handleOnChange={handleChangeInputs}
						error={errorInput && errorInput.type === UserErrorType.ERROR_LAST_NAME && errorInput}
					/>
					<Input
						name="email"
						type="text"
						placeholder="Email"
						inputRef={emailRef}
						handleOnChange={handleChangeInputs}
						error={errorInput && errorInput.type === UserErrorType.ERROR_EMAIL && errorInput}
					/>
					<InputPasswordAndIconShowAndHideContainer>
						<Input
							name="password"
							type="password"
							placeholder="Contraseña"
							paddingRight="3rem"
							inputRef={passwordRef}
							handleOnChange={handleChangeInputs}
							error={errorInput && errorInput.type === UserErrorType.ERROR_PASSWORD && errorInput}
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
						Registrar
					</Button>
					<UserLink to="/login">
						<small>¿Ya tenés cuenta? Iniciá sesión</small>
					</UserLink>
				</UserForm>
			</UserContainer>

			{otherError && (
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

export default Register;
