import React, { useEffect } from "react";
import localStorage from "../../repository/LocalStorage";
import { Button } from "../button/Button";
import { Task } from "../task/Task";
import { TasksListContainerStyled } from "./TaskListStyles";

export const TaskList = (props) => {
	const keyLocalStorage = "tasks";
	const { list, setList } = props;

	useEffect(() => {
		setList(localStorage.get(keyLocalStorage) || []);
	}, []);

	const onClickRemoveById = (id) => {
		const updatedList = list.filter((item) => {
			return item.id != id;
		});
		setList(updatedList);
		localStorage.save(keyLocalStorage, updatedList);
		props.handleFocusInputTask();
	};

	const onClickRemoveItem = () => {
		setList([]);
		localStorage.remove(keyLocalStorage);
		props.handleFocusInputTask();
	};

	const taskList = list.map((item) => <Task key={item.id} data={item} clickHandler={onClickRemoveById} />);

	return (
		<TasksListContainerStyled>
			{list.length ? taskList : "No hay ningúna tarea"}
			{list.length ? <Button value="Borrar Tareas" width="100%" clickHandler={onClickRemoveItem} /> : null}
		</TasksListContainerStyled>
	);
};
