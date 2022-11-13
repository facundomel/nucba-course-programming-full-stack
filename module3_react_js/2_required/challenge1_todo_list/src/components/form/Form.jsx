import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import "./styles.css";

export const Form = props => {
	const { handleAddItem } = props;

	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		handleAddItem({
			done: false,
			id: (+new Date()).toString(),
			description,
		});

		setDescription("");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="todo-list">
					<div className="file-input">
						<div className="input-container">
							<FcSearch className="icon-search" />
							<input type="text" className="input-text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ingresá una tarea" autoFocus />
						</div>
						<button className="button pink add-btn" disabled={description ? "" : "disabled"}>
							Agregar
						</button>
					</div>
				</div>
			</form>
		</>
	);
};
