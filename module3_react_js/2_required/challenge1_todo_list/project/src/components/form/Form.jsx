import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import localStorage from "../../repository/LocalStorage";
import { Button } from "../button/Button";
import { FormStyled, InputContainerStyled } from "./FormStyles";

export const Form = (props) => {
	const { handleAddItem, list } = props;

	const [description, setDescription] = useState("");

	const refInputTask = props.refInputTask;

	const task = {
		id: (+new Date()).toString(),
		description,
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		handleAddItem(task);

		localStorage.save("tasks", [...list, task]);
		setDescription("");
		refInputTask.current.focus();
	};

	return (
		<>
			<FormStyled>
				<InputContainerStyled>
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
				</InputContainerStyled>
				<Button value="Agregar" clickHandler={handleSubmit} isDisabled={description ? false : true} width="20%" />
			</FormStyled>
		</>
	);
};
