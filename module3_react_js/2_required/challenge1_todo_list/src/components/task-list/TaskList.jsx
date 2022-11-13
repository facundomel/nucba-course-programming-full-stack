import React from "react";
import { Button } from "../button/Button";
import { Task } from "../task/Task";
import "./TaskListStyles.css";

export const TaskList = props => {
	const { list, setList } = props;

	const onChangeStatus = (e) => {
		console.log(e.id)
		const { name, checked } = e.target;
		const updateList = list.map((item) => ({
			...item,
			done: item.id === name ? checked : item.done,
		}));
		setList(updateList);
	};

	const onClickRemoveById = (id) => {
		const updatedList = list.filter((item) => {
			return item.id != id;
		});
		setList(updatedList);
	}

	const onClickRemoveItem = () => {
		setList([]);
	};

	const taskList = list.map((item) => <Task key={item.id} data={item} clickHandler={onClickRemoveById} />);

	return (
		<div className="tasks-list">
			{list.length ? taskList : "No hay tareas"}
			{list.length ? <Button value="Borrar Tareas" clickHandler={onClickRemoveItem} /> : null}
		</div>
	);
};
