import React, { useEffect, useRef, useState } from "react";
import {
	ErrorContainer,
	IconShowAndHidePasswordContainer,
	InformationPasswordForgotPasswordContainer,
	PasswordForgotPasswordContainer,
	UserContainer,
	UserForm,
	UserLink,
} from "../UserStyles";
import Input from "../../../atomics/input/Input";
import Button from "../../../atomics/button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { UserErrorType } from "../../../../model/enum/ErrorType";
import UserService from "../../../../service/UserService";
import { useNavigate } from "react-router-dom";
import CustomException from "../../../../model/CustomException";
import { isValidEmail } from "../UserValidations";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions";
import Utils from "../../../../utils/Utils";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import { UserPageSection } from "../../../../model/enum/PageSection";

const ForgotPassword = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [email, setEmail] = useState("");
	const [errorInput, setErrorInput] = useState(null);
	const [otherError, setOtherError] = useState(null);
	const [userPassword, setUserPassword] = useState(null);
	const [typeInputPassword, setTypeInputPassword] = useState("password");
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		emailRef.current.focus();
		dispatch(userActions.setUserSection(UserPageSection.UserForgotPassword));
	}, []);

	useEffect(() => {
		if (!errorInput && !otherError) return;
		if (errorInput) setErrorInput(null);
		if (otherError) setOtherError(null);
	}, [email]);

	const handleChangeInputEmail = (e) => {
		setEmail(e.target.value);
	};

	const onSubmitForgotPassword = async (e) => {
		e.preventDefault();

		if (!isValidEmail(email, setErrorInput, emailRef, true)) return;

		// const user = localStorage.get(KEY_USER_SESSION) || null;

		// if (!isExistEmail(user, email, setError, emailRef, userPassword, setUserPassword)) return;

		// setUserPassword(user.password);
		try {
			const user = await UserService.getUserByEmail(email);
			if (user != null) {
				dispatch(userActions.setUserForgotPassword({ id: user.id }));
				navigate("/nueva-contraseña");
			}
		} catch (error) {
			if (error instanceof CustomException) {
				if (error.type === UserErrorType.ERROR_EMAIL) {
					setErrorInput(error);
					emailRef.current.focus();
				} else {
					setOtherError(error);
					SnackbarUtils.error(error, 2500, dispatch);
					emailRef.current.focus();
				}
			}
		}
	};

	return (
		<>
			<UserContainer>
				<h1>Restablecé tu contraseña</h1>
				<UserForm onSubmit={onSubmitForgotPassword}>
					{/* <ErrorContainer isBorder={errorInput && errorInput.type === UserErrorType.ERROR_EMAIL ? true : false}> */}
					<Input
						name="email"
						type="text"
						placeholder="Email"
						inputRef={emailRef}
						error={errorInput}
						handleOnChange={handleChangeInputEmail}
					/>
					{/* </ErrorContainer> */}

					<Button type="submit" width="100%">
						Restablecer
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

export default ForgotPassword;
