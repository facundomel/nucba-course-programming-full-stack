import React, { useRef, useState } from "react";
import { Form } from "../form/Form";
import { TaskList } from "../task-list/TaskList";
import { FormAndTaskListContainerStyled, MainContainerStyled } from "./MainTodoListStyles";

export const MainTodoList = () => {
	const [list, setList] = useState([]);

	const handleAddItem = (addItem) => {
		setList([...list, addItem]);
	};

	const refInputTask = useRef(null);

	const handleFocusInputTask = () => {
		refInputTask.current.focus();
	};

	return (
		<>
			<MainContainerStyled>
				<FormAndTaskListContainerStyled>
					<Form handleAddItem={handleAddItem} list={list} refInputTask={refInputTask} />
					<TaskList list={list} setList={setList} handleFocusInputTask={handleFocusInputTask} />
				</FormAndTaskListContainerStyled>
			</MainContainerStyled>
		</>
	);
};
