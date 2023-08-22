import React from "react";
import { FormContainerStyled } from "../../shared/comp/form/FormGenericStyles";
import { MainContainerStyled } from "../../shared/styles/MainStyles";
import { Card } from "../card/Card";
import { Form } from "../form/Form";

export const Main = () => {
	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<Form />
					<Card />
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
};
