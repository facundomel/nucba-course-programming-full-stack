import React, { useState } from "react";
import { Form } from "../form/Form";
import { TaskList } from "../task-list/TaskList";
import './styles.css'

export const Container = () => {
	const [list, setList] = useState([]);

	const handleAddItem = (addItem) => {
		setList([...list, addItem]);
	};

	return (
		<>
			<div className="container">
				<Form handleAddItem={handleAddItem} />
				<TaskList list={list} setList={setList} />
			</div>
		</>
	);
};
