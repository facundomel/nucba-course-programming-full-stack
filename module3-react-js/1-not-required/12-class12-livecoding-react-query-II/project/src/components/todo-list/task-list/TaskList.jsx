import React, { useContext } from "react";
import { TodoListContext } from "../../../contexts/TodoListContext";
import { Button } from "../../shared/comp/button/Button";
import { Task } from "../task/Task";
import { TasksListContainerStyled } from "./TaskListStyles";
import { useMutation } from "react-query";
import taskService from "../../../service/TaskService";

export const TaskList = () => {
	const { list, setList, handlerFocusInputTask } = useContext(TodoListContext);

	const mutationDeleteTaskById = useMutation({
		mutationFn: (taskId) => {
			return taskService.deleteTaskById(taskId);
		},
	});

	const mutationDeleteAllTasks = useMutation({
		mutationFn: () => {
			return taskService.deleteAllTasks();
		},
	});

	const deleteTaskById = (id) => {
		const updatedList = list.filter((item) => {
			return item.id != id;
		});
		setList(updatedList);

		mutationDeleteTaskById.mutate(id);
		handlerFocusInputTask();
	};

	const removeAllTasks = () => {
		list.forEach((item) => {
			mutationDeleteTaskById.mutate(item.id);
		});
		setList([]);
		handlerFocusInputTask();
	};

	const taskList = list.map((item) => <Task key={item.id} data={item} deleteTaskById={deleteTaskById} />);

	return (
		<TasksListContainerStyled>
			{list.length ? taskList : <span> No hay ninguna tarea almacenada </span>}
			{list.length ? <Button value="Borrar Tareas" width="100%" clickHandler={removeAllTasks} /> : null}
		</TasksListContainerStyled>
	);
};
