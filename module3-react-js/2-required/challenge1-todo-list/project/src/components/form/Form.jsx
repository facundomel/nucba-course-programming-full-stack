import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import localStorage from "../../repository/LocalStorage";
import { Button } from "../button/Button";
import { FormStyled, InputAndErrorMessageContainerStyled, InputAndIconContainerStyled } from "./FormStyles";

export const Form = (props) => {
	const { handleAddItem, list } = props;

	const [description, setDescription] = useState("");

	const refInputTask = props.refInputTask;

	const task = {
		id: (+new Date()).toString(),
		description,
	};

	const existTask = () => {
		return list.some((task) => {
			return task.description == description;
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (existTask()) return;

		handleAddItem(task);

		localStorage.save("tasks", [...list, task]);
		setDescription("");
		refInputTask.current.focus();
	};

	return (
		<>
			<InputAndErrorMessageContainerStyled>
				<FormStyled>
					<InputAndIconContainerStyled>
						<FcSearch className="icon-search" />
						<input
							type="text"
							className="input-text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Tarea"
							ref={refInputTask}
							autoFocus
						/>
					</InputAndIconContainerStyled>
					<Button value="Agregar" clickHandler={handleSubmit} isDisabled={!description || existTask() ? true : false} width="20%" />
				</FormStyled>
				{existTask() && <small>La tarea ya existe</small>}
			</InputAndErrorMessageContainerStyled>
		</>
	);
};
