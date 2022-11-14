import React from "react";
import { MdDelete } from "react-icons/md";
import "./TaskStyles.css";

export const Task = (props) => {
	const { id, description } = props.data;

	return (
		<>
			<div className="task">
				<span>{description}</span>
				<MdDelete className="btn-delete" onClick={() => props.clickHandler(id)} />
			</div>
		</>
	);
};
