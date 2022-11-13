import React from "react";
import "./styles.css";

export const Task = (props) => {
	const {
		onChange,
		data: { id, description, done },
	} = props;

	return (
		<>
			<div className="task">
				<span>{description}</span>
			</div>
		</>
	);
};
