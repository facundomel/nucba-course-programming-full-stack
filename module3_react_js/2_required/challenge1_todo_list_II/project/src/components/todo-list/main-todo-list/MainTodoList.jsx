import React, { useRef, useState } from "react";
import { FormContainerStyled, MainContainerStyled } from "../../styles/MainStyles";
import { Form } from "../form/Form";
import { TaskList } from "../task-list/TaskList";

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
				<FormContainerStyled>
					<Form handleAddItem={handleAddItem} list={list} refInputTask={refInputTask} />
					<TaskList list={list} setList={setList} handleFocusInputTask={handleFocusInputTask} />
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
};
