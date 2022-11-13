import React from "react";
import { Task } from "../task/Task";
import "./styles.css";

export const TaskList = (props) => {
	const { list, setList } = props;

	const onChangeStatus = (e) => {
		const { name, checked } = e.target;
		const updateList = list.map((item) => ({
			...item,
			done: item.id === name ? checked : item.done,
		}));
		setList(updateList);
	};

	const onClickRemoveItem = (e) => {
		const updateList = list.filter((item) => !item.done);
		setList([]);
	};

	const taskList = list.map((item) => <Task key={item.id} data={item} onChange={onChangeStatus} />);

	return (
		<div className="tasks-list">
			{list.length ? taskList : "No hay tareas"}
			{list.length ? (
				<button className="btn-delete-all" onClick={onClickRemoveItem}>
					Borrar Tareas
				</button>
			) : null}
		</div>
	);
};
