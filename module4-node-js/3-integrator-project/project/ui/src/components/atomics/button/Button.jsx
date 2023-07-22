import React from "react";
import { ButtonStyled } from "./ButtonStyles";

const Button = ({ children, onClick, disabled = false, type, width }) => {
	return (
		<ButtonStyled whileTap={{ scale: 0.95 }} disabled={disabled} onClick={onClick} type={type} width={width}>
			{children}
		</ButtonStyled>
	);
};

export default Button;
