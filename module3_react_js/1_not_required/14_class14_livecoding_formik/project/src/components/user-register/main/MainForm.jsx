import React from "react";
import { FormContainerStyled, MainContainerStyled } from "./MainFormStyles";
import { Form } from "../form/Form";

export const MainForm = () => {
	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<Form />
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
};
