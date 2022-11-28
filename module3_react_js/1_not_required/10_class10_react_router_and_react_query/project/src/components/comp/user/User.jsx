import React from "react";
import "./UserStyles.js";
import { ContainerTaskStyled } from "./UserStyles.js";

export const User = (props) => {
	const { id, firstName, lastName, city } = props.data;

	return (
		<>
			<ContainerTaskStyled>
				<span>{id}</span>
				<span>{firstName}</span>
				<span>{lastName}</span>
				<span>{city}</span>
			</ContainerTaskStyled>
		</>
	);
};
