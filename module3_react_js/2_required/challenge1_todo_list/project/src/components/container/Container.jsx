import React, { useRef, useState } from "react";
import { Form } from "../form/Form";
import { TaskList } from "../task-list/TaskList";
import "./ContainerStyles.css";

export const Container = () => {
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
			<div className="container">
				<Form handleAddItem={handleAddItem} list={list} refInputTask={refInputTask} />
				<TaskList list={list} setList={setList} handleFocusInputTask={handleFocusInputTask} />
			</div>
		</>
	);
};
