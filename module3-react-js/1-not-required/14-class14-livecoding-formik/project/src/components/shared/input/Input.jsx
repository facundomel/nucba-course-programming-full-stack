import { ErrorMessage, Field } from "formik";
import React from "react";
import {
	InputBoxStyled,
	InputLabelStyled,
	InputStyled,
	ErrorStyled,
	InputCheckboxStyled,
	ContainerFieldAndErrorMessage,
} from "./InputStyles";

const Input = ({ name, label, type, isError }) => {
	return (
		<>
			{name == "motorcycleExperience" ? (
				<InputCheckboxStyled>
					<InputLabelStyled htmlFor={label}>{label}</InputLabelStyled>
					<Field name={name} type={type} id={label} />
				</InputCheckboxStyled>
			) : (
				<InputBoxStyled>
					<InputLabelStyled htmlFor={label}>{label}</InputLabelStyled>
					<ContainerFieldAndErrorMessage>
						<Field error={isError} name={name} type={type} id={label} as={InputStyled} />
						<ErrorMessage name={name} component={ErrorStyled} />
					</ContainerFieldAndErrorMessage>
				</InputBoxStyled>
			)}
		</>
	);
};

export default Input;
