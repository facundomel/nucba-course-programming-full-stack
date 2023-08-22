import React from "react";
import { ButtonStyled } from "./ButtonStyles";

export const Button = (props) => {
	return (
		<ButtonStyled width={props.width} disabled={props.isDisabled ? true : false} onClick={props.clickHandler}>
			{props.value}
		</ButtonStyled>
	);
};
