import React, { useEffect, useRef, useState } from "react";
import {
	ErrorContainer,
	IconShowAndHidePasswordContainer,
	InformationPasswordForgotPasswordContainer,
	InputPasswordAndIconShowAndHideContainer,
	PasswordForgotPasswordContainer,
	UserContainer,
	UserForm,
	UserLink,
} from "../UserStyles";
import Input from "../../../atomics/input/Input";
import Button from "../../../atomics/button/Button";
import { KEY_USER_SESSION } from "../../../../repository/LocalStorage";
import localStorage from "../../../../repository/LocalStorage";
import { isExistEmail, isValidEmail } from "./ForgotPasswordValidations";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { UserErrorType } from "../../../../model/enum/ErrorType";
import { isValidPassword } from "../UserValidations";
import UserService from "../../../../service/UserService";
import CustomException from "../../../../model/CustomException";
import { useNavigate } from "react-router-dom";
import Utils from "../../../../utils/Utils";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions";

const NewPassword = () => {
	const passwordRef = useRef();
	// const [email, setEmail] = useState("");
	const [errorInput, setErrorInput] = useState(null);
	const [otherError, setOtherError] = useState(null);
	const [password, setPassword] = useState("");
	const [typeInputPassword, setTypeInputPassword] = useState("password");
	const dispatch = useDispatch();
	const { userForgotPassword } = useSelector((state) => state.user);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const navigate = useNavigate();

	useEffect(() => {
		// if (!userForgotPassword) {
		// 	Utils.setSnackbarError(new CustomException("", "Ocurrió un error. Será redireccionado para que vuelva a intentarlo"), dispatch);
		// 	setTimeout(() => {
		// 		navigate("/recuperar-contraseña");
		// 	}, 3000);
		// }

		passwordRef.current.focus();
		dispatch(userActions.setUserSection("NewPassword"));
	}, []);

	useEffect(() => {
		if (!errorInput && !otherError) return;
		if (errorInput) setErrorInput(null);
		if (otherError) setOtherError(null);
	}, [password]);

	const handleChangeInputPassword = (e) => {
		setPassword(e.target.value);
	};

	const onSubmitNewPassword = async (e) => {
		e.preventDefault();

		if (!isValidPassword(password, setErrorInput, passwordRef, true)) return;

		// const user = localStorage.get(KEY_USER_SESSION) || null;

		// if (!isExistEmail(user, email, setError, passwordRef, userPassword, setUserPassword)) return;

		// setUserPassword(user.password);
		try {
			const user = await UserService.updateUserPassword(userForgotPassword.id, password);
			if (user != null) {
				navigate("/login");
				dispatch(userActions.removeUserForgotPassword());
				dispatch(
					snackbarActions.setOptionsSnackbar({
						open: true,
						severity: "success",
						message: `Contraseña actualizada correctamente`,
						autoHideDuration: 2500,
					})
				);
			}
		} catch (error) {
			setOtherError(error);
			Utils.setSnackbarError(error, dispatch);
			passwordRef.current.focus()
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
				<h1>Nueva contraseña</h1>
				<UserForm onSubmit={onSubmitNewPassword}>
					<InputPasswordAndIconShowAndHideContainer>
						<Input
							name="password"
							type="password"
							placeholder="Contraseña"
							paddingRight="3rem"
							inputRef={passwordRef}
							handleOnChange={handleChangeInputPassword}
							error={errorInput && errorInput.type === UserErrorType.ERROR_PASSWORD && errorInput}
						/>

						<IconShowAndHidePasswordContainer
							onClick={(e) => {
								typeInputPassword === "password" ? showPassword(e) : hidePassword(e);
							}}
							valuePassword={password}
							disabled={password ? false : true}
							position="absolute"
						>
							{typeInputPassword === "password" || !password ? <AiFillEyeInvisible /> : <AiFillEye />}
						</IconShowAndHidePasswordContainer>
					</InputPasswordAndIconShowAndHideContainer>

					<Button type="submit" width="100%">
						Aceptar
					</Button>

					<UserLink to="/login">
						<small>¿Ya te acordaste los datos? Ingresá</small>
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

export default NewPassword;
