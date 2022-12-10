import React, { useContext, useState } from "react";
import { TodoListContext } from "../../../contexts/TodoListContext";
import { Form as FormModel } from "../../../model/Form";
import { FormGeneric } from "../../shared/comp/form/FormGeneric";
import { useMutation } from "react-query";
import taskService from "../../../service/TaskService";

export const Form = () => {
	const { handlerAddItem, list, refInputTask, handlerFocusInputTask } = useContext(TodoListContext);
	const [description, setDescription] = useState("");

	const task = {
		id: (+new Date()).toString(),
		description,
	};

	const mutationSaveTask = useMutation({
		mutationFn: (task) => {
			return taskService.saveTask(task);
		},
	});

	const existTask = () => {
		return list.some((task) => {
			return task.description == description;
		});
	};

	const handlerClickButton = (e) => {
		e.preventDefault();

		if (existTask()) return;

		mutationSaveTask.mutateAsync(task).then(() => {
			handlerAddItem(task);

			setDescription("");
			handlerFocusInputTask();
		});
	};

	const handlerOnChangeInput = (e) => {
		setDescription(e.target.value);
	};

	const handlerDisableButton = () => {
		return !description || existTask() ? true : false;
	};

	const handlerMessageError = () => {
		if (existTask()) return <small>La tarea ya existe</small>;

		if (mutationSaveTask.isError) return <small>{mutationSaveTask.error.message}</small>;
	};

	const dataForm = new FormModel(
		description,
		"Tarea",
		refInputTask,
		handlerOnChangeInput,
		handlerClickButton,
		handlerDisableButton,
		handlerMessageError,
		"Agregar"
	);

	return (
		<>
			<FormGeneric data={dataForm} />
		</>
	);
};
