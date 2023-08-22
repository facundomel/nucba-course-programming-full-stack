import React, { useEffect, useRef, useState } from "react";
import { TextButtonAndSpinner, UserContainer, UserForm, UserLink } from "../UserStyles";
import Input from "../../../atomics/input/Input";
import Button from "../../../atomics/button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import { UserErrorType } from "../../../../model/enum/ErrorType";
import UserService from "../../../../service/UserService";
import { useNavigate } from "react-router-dom";
import CustomException from "../../../../model/CustomException";
import { isValidEmail } from "../UserValidations";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import { UserPageSection } from "../../../../model/enum/PageSection";
import { SpinnerCustom } from "../../../atomics/spinner/SpinnerCustom";

const ForgotPassword = () => {
	const emailRef = useRef();
	const [email, setEmail] = useState("");
	const [errorInput, setErrorInput] = useState(null);
	const [otherError, setOtherError] = useState(null);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

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

		try {
			setLoading(true);
			const user = await UserService.getUserByEmail(email);
			if (user != null) {
				setTimeout(() => {
					setLoading(false);
					dispatch(userActions.setUserForgotPassword({ id: user.id }));
					navigate("/nueva-contraseña");
				}, 500);
			}
		} catch (error) {
			setTimeout(() => {
				setLoading(false);
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
			}, 500);
		}
	};

	return (
		<>
			<UserContainer>
				<h1>Restablecé tu contraseña</h1>
				<UserForm onSubmit={onSubmitForgotPassword}>
					<Input
						name="email"
						type="text"
						placeholder="Email"
						inputRef={emailRef}
						error={errorInput}
						handleOnChange={handleChangeInputEmail}
					/>

					<Button type="submit" width="100%">
						<TextButtonAndSpinner>
							Aceptar {loading && <SpinnerCustom size={"1.2rem"} gap={"0px"} height={"0px"} color={"var(--black)"} />}
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

export default ForgotPassword;
