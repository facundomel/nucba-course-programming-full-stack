import React from "react";
import { MdDelete } from "react-icons/md";
import { TaskContainerStyled } from "./TaskStyles";

export const Task = (props) => {
	const { id, description } = props.data;

	return (
		<>
			<TaskContainerStyled>
				<span>{description}</span>
				<MdDelete className="btn-delete" onClick={() => props.deleteTaskById(id)} />
			</TaskContainerStyled>
		</>
	);
};
