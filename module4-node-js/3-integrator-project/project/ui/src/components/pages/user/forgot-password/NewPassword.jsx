import React, { useEffect, useRef, useState } from "react";
import {
	IconShowAndHidePasswordContainer,
	InputPasswordAndIconShowAndHideContainer,
	TextButtonAndSpinner,
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
import { isValidPassword } from "../UserValidations";
import UserService from "../../../../service/UserService";
import { useNavigate } from "react-router-dom";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import { UserPageSection } from "../../../../model/enum/PageSection";
import { SpinnerCustom } from "../../../atomics/spinner/SpinnerCustom";

const NewPassword = () => {
	const passwordRef = useRef();
	const [errorInput, setErrorInput] = useState(null);
	const [otherError, setOtherError] = useState(null);
	const [password, setPassword] = useState("");
	const [typeInputPassword, setTypeInputPassword] = useState("password");
	const dispatch = useDispatch();
	const { userForgotPassword } = useSelector((state) => state.user);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		passwordRef.current.focus();
		dispatch(userActions.setUserSection(UserPageSection.UserNewPassword));

		return () => {
			dispatch(userActions.removeUserForgotPassword());
		};
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

		try {
			setLoading(true);
			const userUpdated = await UserService.updateUserPassword(userForgotPassword.id, password);
			if (userUpdated != null) {
				setTimeout(() => {
					setLoading(false);
					navigate("/login");
					SnackbarUtils.success("Contraseña actualizada correctamente", 2500, dispatch);
				}, 500);
			}
		} catch (error) {
			setTimeout(() => {
				setLoading(false);
				if (error.type === UserErrorType.ERROR_PASSWORD) {
					setErrorInput(error);
				} else {
					setOtherError(error);
					SnackbarUtils.error(error, 2500, dispatch);
				}
				passwordRef.current.focus();
			}, 500);
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
				<h1>Restablecé tu contraseña</h1>
				<UserForm onSubmit={onSubmitNewPassword}>
					<InputPasswordAndIconShowAndHideContainer>
						<Input
							name="password"
							type="password"
							placeholder="Nueva contraseña"
							paddingRight="3rem"
							inputRef={passwordRef}
							handleOnChange={handleChangeInputPassword}
							error={errorInput && errorInput.type === UserErrorType.ERROR_PASSWORD && errorInput}
						/>

						<IconShowAndHidePasswordContainer
							type="button"
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
						<TextButtonAndSpinner>
							Actualizar {loading && <SpinnerCustom size={"1.2rem"} gap={"0px"} height={"0px"} color={"var(--black)"} />}
						</TextButtonAndSpinner>
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
