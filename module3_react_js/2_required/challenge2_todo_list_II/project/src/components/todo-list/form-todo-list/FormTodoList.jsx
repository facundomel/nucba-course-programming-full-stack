import React, { useContext, useState } from "react";
import { TodoListContext } from "../../../contexts/TodoListContext";
import FormModel from "../../../model/FormModel";
import LocalStorage from "../../../repository/LocalStorage";
import { Form } from "../../shared/comp/form/Form";

export const FormTodoList = () => {
	const { handleAddItem, list, refInputTask, handleFocusInputTask } = useContext(TodoListContext);
	const [description, setDescription] = useState("");

	const task = {
		id: (Date.now()).toString(),
		description,
	};

	const existTask = () => {
		return list.some((task) => {
			return task.description == description;
		});
	};

	const handlerClickButton = (e) => {
		e.preventDefault();

		console.log(task.id);

		if (existTask()) return;

		handleAddItem(task);

		LocalStorage.save("tasks", [...list, task]);
		setDescription("");
		handleFocusInputTask();
	};

	const handlerOnChangeInput = (e) => {
		setDescription(e.target.value);
	};

	const handlerDisableButton = () => {
		return !description || existTask() ? true : false;
	};

	const handlerMessageError = () => {
		return existTask() && <small>La tarea ya existe</small>;
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
			<Form data={dataForm} />
		</>
	);
};
