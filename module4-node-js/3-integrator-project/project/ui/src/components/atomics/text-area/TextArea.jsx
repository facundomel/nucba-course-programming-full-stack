import React from "react";
import { ErrorContainer, ErrorMessage } from "../../pages/user/UserStyles";
import { TextAreaContainerStyled, TextAreaStyled } from "./TextAreaStyles";

const TextArea = ({ textAreaRef, name, type, placeholder, handleOnChange, error, paddingRight, rows }) => {
	return (
		<ErrorContainer>
			<TextAreaContainerStyled>
				<TextAreaStyled
					ref={textAreaRef}
					type={type}
					placeholder={placeholder}
					name={name}
					paddingRight={paddingRight}
					onChange={(e) => handleOnChange(e)}
					isError={error && true}
					rows={rows}
				/>
			</TextAreaContainerStyled>
			{error && <ErrorMessage textAlign="left">{error.message}</ErrorMessage>}
		</ErrorContainer>
	);
};

export default TextArea;
