import React from "react";
import { ERROR_EMAIL_OR_PASSWORD } from "../../../model/ErrorCustom";
import { ErrorContainer, ErrorMessage } from "../../pages/user/UserStyles";
import { InputContainerStyled, InputStyled } from "./InputStyles";

const Input = ({ inputRef, name, type, placeholder, handleOnChange, error }) => {
	return (
		<ErrorContainer>
			<InputContainerStyled>
				<InputStyled
					ref={inputRef}
					type={type}
					placeholder={placeholder}
					name={name}
					onChange={(e) => handleOnChange(e)}
					isError={error && true}
				/>
			</InputContainerStyled>
			{error && error.type != ERROR_EMAIL_OR_PASSWORD && <ErrorMessage textAlign="left">{error.message}</ErrorMessage>}
		</ErrorContainer>
	);
};

export default Input;
