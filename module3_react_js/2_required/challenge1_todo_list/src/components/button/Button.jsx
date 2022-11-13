import React from "react";
import "./ButtonStyles.css";

export const Button = (props) => {
	return (
		<button
			className={`button-component ${props.isDisabled ? "disable-button" : "enable-button"}`}
			disabled={props.isDisabled ? "disabled" : null}
			onClick={props.clickHandler}
		>
			{props.value}
		</button>
	);
};
