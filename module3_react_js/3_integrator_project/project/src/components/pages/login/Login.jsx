import { Formik } from "formik";
import React from "react";
import Input from "../../atomics/input/Input";
import { Form, LoginContainer, LoginEmailAndPasswordStyled } from "./LoginStyles";
import { loginInitialValues, loginValidationSchema } from "./formik";
import Button from "../../atomics/button/Button";
import { useDispatch } from "react-redux";
import * as userActions from "../../../redux/user/UserActions";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<LoginContainer>
				<h1>Iniciar Sesión</h1>
				<Formik
					initialValues={loginInitialValues}
					validationSchema={loginValidationSchema}
					onSubmit={(values) => {
						try {
							dispatch(userActions.setCurrentUser({ values }));
							navigate("/");
						} catch (error) {
							console.log(error);
							alert("Datos incorrectos");
						}
					}}
				>
					<Form>
						<Input name="email" type="text" placeholder="Email" />
						<Input name="password" type="password" placeholder="Password" />
						<Button type="submit" width="100%">
							Ingresar
						</Button>
						<LoginEmailAndPasswordStyled to="/forgot-password">
							<p>¿Olvidaste la contraseña? Restablecela</p>
						</LoginEmailAndPasswordStyled>
						<LoginEmailAndPasswordStyled to="/register">
							<p>¿No tenes cuenta? Crea una</p>
						</LoginEmailAndPasswordStyled>
					</Form>
				</Formik>
			</LoginContainer>
		</>
	);
};
