import React from "react";
import "./ButtonStyles.css";

export const Button = props => {
	return (
		<button className={`button-component ${props.isDisabled ? "disable-button" : "enable-button"}`} onClick={props.clickHandler}>
			{props.value}
		</button>
	);
};
