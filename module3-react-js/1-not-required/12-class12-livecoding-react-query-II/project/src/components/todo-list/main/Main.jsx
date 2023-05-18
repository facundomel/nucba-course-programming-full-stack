import React from "react";
import { FormContainerStyled } from "../../shared/comp/form/FormGenericStyles";
import { MainContainerStyled } from "../../shared/styles/MainStyles";
import { Form } from "../form/Form";
import { TaskList } from "../task-list/TaskList";

export const Main = () => {
	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<Form />
					<TaskList />
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
};
