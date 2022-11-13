import React from "react";
import {MdDelete} from 'react-icons/md';
import "./TaskStyles.css";

export const Task = props => {
	const {
		data: { id, description },
	} = props;

	return (
		<>
			<div className="task">
				<span>{description}</span>
				<MdDelete className="btn-delete" />
			</div>
		</>
	);
};
