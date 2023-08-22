import React from "react";
import { FormContainerStyled } from "../../shared/comp/form/FormStyles";
import { MainContainerStyled } from "../../shared/styles/MainStyles";
import { FormTodoList } from "../form-todo-list/FormTodoList";
import { TaskList } from "../task-list/TaskList";

export const MainTodoList = () => {
	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<FormTodoList />
					<TaskList />
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
};
