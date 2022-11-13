import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { Button } from "../button/Button";
import "./FormStyles.css";

export const Form = props => {
	const { handleAddItem } = props;

	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		handleAddItem({
			id: (+new Date()).toString(),
			description,
		});

		setDescription("");
	};

	return (
		<>
			<form className="form">
				<div className="todo-list">
					<div className="file-input">
						<div className="input-container">
							<FcSearch className="icon-search" />
							<input
								type="text"
								className="input-text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Ingresá una tarea"
								autoFocus
							/>
						</div>
						<Button value="Agregar" clickHandler={handleSubmit} isDisabled={description ? false : true} />
					</div>
				</div>
			</form>
		</>
	);
};
