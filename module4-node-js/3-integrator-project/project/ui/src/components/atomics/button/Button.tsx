import React from "react";
import { ButtonStyled } from "./ButtonStyles";

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type: "button" | "submit" | "reset";
	width?: string;
};

const Button = ({ children, onClick, disabled = false, type, width }: ButtonProps) => {
	return (
		<ButtonStyled whileTap={{ scale: 0.95 }} disabled={disabled} onClick={onClick} type={type} width={width || ""}>
			{children}
		</ButtonStyled>
	);
};

export default Button;
