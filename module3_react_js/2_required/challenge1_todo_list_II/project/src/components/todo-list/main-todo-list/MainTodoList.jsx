import React from "react";
import { FormContainerStyled, MainContainerStyled } from "../../shared/styles/MainStyles";
import { Form } from "../form/Form";
import { TaskList } from "../task-list/TaskList";

export const MainTodoList = () => {
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
