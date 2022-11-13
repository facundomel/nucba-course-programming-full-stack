import React from "react";
import { Button } from "../button/Button";
import { Task } from "../task/Task";
import "./TaskListStyles.css";

export const TaskList = (props) => {
	const { list, setList } = props;

	const onClickRemoveById = (id) => {
		const updatedList = list.filter((item) => {
			return item.id != id;
		});
		setList(updatedList);
		props.handleFocusInputTask();
	};

	const onClickRemoveItem = () => {
		setList([]);
		props.handleFocusInputTask();
	};

	const taskList = list.map((item) => <Task key={item.id} data={item} clickHandler={onClickRemoveById} />);

	return (
		<div className="tasks-list">
			{list.length ? taskList : "No hay tareas"}
			{list.length ? <Button value="Borrar Tareas" width="100%" clickHandler={onClickRemoveItem} /> : null}
		</div>
	);
};
