import { useEffect, useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions";
import { useNavigate } from "react-router-dom";
import ErrorCustom, { ERROR_EMAIL, ERROR_EMAIL_OR_PASSWORD, ERROR_PASSWORD } from "../../../../model/ErrorCustom";
import { KEY_USER_SESSION } from "../../../../repository/LocalStorage";
import localStorage from "../../../../repository/LocalStorage";
import { isValidEmail, isValidEmailAndPassword, isValidPassword } from "./LoginValidations";
import UserSession from "../../../../model/UserSession";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai/index";

const Login = () => {
	const [error, setError] = useState<ErrorCustom | null>(null);
	const [valueInputs, setValueInputs] = useState({ email: "", password: "" });
	const [typeInputPassword, setTypeInputPassword] = useState("password");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		emailRef.current?.focus();
		dispatch(userActions.setUserSection("UserLogin"));
	}, []);

	useEffect(() => {
		if (!error) return;

		setError(null);
	}, [valueInputs]);

	const handleChangeInputs = (e: any) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		if (name == "password" && value == "" && passwordRef.current?.type == "text") {
			passwordRef.current.type = "password";
			setTypeInputPassword(passwordRef.current.type);
		}

		setValueInputs({ ...valueInputs, [name]: value });
	};

	const onSubmitLoginUser = (e: any) => {
		e.preventDefault();

		if (!isValidEmail(valueInputs.email, setError, emailRef)) return;
		if (!isValidPassword(valueInputs.password, setError, passwordRef)) return;

		const user = localStorage.get(KEY_USER_SESSION) || null;

		if (!isValidEmailAndPassword(user, valueInputs.email, valueInputs.password, setError, emailRef)) return;

		dispatch(userActions.setCurrentUser(new UserSession(valueInputs)));
		navigate("/");
		dispatch(snackbarActions.setOptionsSnackbar({ open: true, severity: "info", message: `¡Bienvenido nuevamente ${user.name}!` }));
	};

	const showPassword = (e: any) => {
		e.preventDefault();
		if (passwordRef.current) {
			passwordRef.current.type = "text";
			setTypeInputPassword(passwordRef.current.type);
		}
	};

	const hidePassword = (e: any) => {
		e.preventDefault();
		if (passwordRef.current) {
			passwordRef.current.type = "password";
			setTypeInputPassword(passwordRef.current.type);
		}
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
						error={error && (error.type == ERROR_EMAIL || error.type == ERROR_EMAIL_OR_PASSWORD) && error}
					/>
					<InputPasswordAndIconShowAndHideContainer>
						<Input
							name="password"
							type="password"
							placeholder="Password"
							paddingRight="3rem"
							inputRef={passwordRef}
							handleOnChange={handleChangeInputs}
							error={error && (error.type == ERROR_PASSWORD || error.type == ERROR_EMAIL_OR_PASSWORD) && error}
						/>

						<IconShowAndHidePasswordContainer
							onClick={(e) => {
								typeInputPassword == "password" ? showPassword(e) : hidePassword(e);
							}}
							valuePassword={valueInputs.password}
							disabled={valueInputs.password ? false : true}
							position="absolute"
						>
							{typeInputPassword == "password" || !valueInputs.password ? <AiFillEyeInvisible /> : <AiFillEye />}
						</IconShowAndHidePasswordContainer>
					</InputPasswordAndIconShowAndHideContainer>
					<ErrorContainer isGap={true}>
						{error && error.type == ERROR_EMAIL_OR_PASSWORD && <ErrorMessage textAlign="center">{error.message}</ErrorMessage>}
						<Button type="submit" width="100%">
							Ingresar
						</Button>
					</ErrorContainer>
					<UserLink to="/recuperar-password">
						<small>¿Olvidaste la contraseña? Restablecela</small>
					</UserLink>
					<UserLink to="/registro">
						<small>¿No tenés cuenta? Registrate</small>
					</UserLink>
				</UserForm>
			</UserContainer>
		</>
	);
};

export default Login;
