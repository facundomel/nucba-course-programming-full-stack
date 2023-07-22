import React from "react";
import { ErrorType } from "../../../model/ErrorCustom";
import { ErrorContainer, ErrorMessage } from "../../pages/user/UserStyles";
import { InputContainerStyled, InputStyled } from "./InputStyles";

const Input = ({ inputRef, name, type, placeholder, handleOnChange, error, paddingRight }) => {
	return (
		<ErrorContainer>
			<InputContainerStyled>
				<InputStyled
					ref={inputRef}
					type={type}
					placeholder={placeholder}
					name={name}
					paddingRight={paddingRight}
					onChange={(e) => handleOnChange(e)}
					isError={error && true}
				/>
			</InputContainerStyled>
			{error && error.type !== ErrorType.ERROR_EMAIL_OR_PASSWORD && <ErrorMessage textAlign="left">{error.message}</ErrorMessage>}
		</ErrorContainer>
	);
};

export default Input;
