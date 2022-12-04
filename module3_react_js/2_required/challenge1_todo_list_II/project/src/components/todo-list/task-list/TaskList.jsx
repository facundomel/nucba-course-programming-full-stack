import React, { useContext, useEffect } from "react";
import { TodoListContext } from "../../../contexts/TodoListContext";
import LocalStorage from "../../../repository/LocalStorage";
import { Button } from "../../button/Button";
import { Task } from "../task/Task";
import { TasksListContainerStyled } from "./TaskListStyles";

export const TaskList = () => {
	const keyLocalStorage = "tasks";
	const { list, setList, handleFocusInputTask } = useContext(TodoListContext);

	const onClickRemoveById = (id) => {
		const updatedList = list.filter((item) => {
			return item.id != id;
		});
		setList(updatedList);
		LocalStorage.save(keyLocalStorage, updatedList);
		handleFocusInputTask();
	};

	const onClickRemoveItem = () => {
		setList([]);
		LocalStorage.remove(keyLocalStorage);
		handleFocusInputTask();
	};
	
	const taskList = list.map((item) => <Task key={item.id} data={item} onClickRemoveById={onClickRemoveById} />);

	return (
		<TasksListContainerStyled>
			{list.length ? taskList : "No hay ningúna tarea"}
			{list.length ? <Button value="Borrar Tareas" width="100%" clickHandler={onClickRemoveItem} /> : null}
		</TasksListContainerStyled>
	);
};
