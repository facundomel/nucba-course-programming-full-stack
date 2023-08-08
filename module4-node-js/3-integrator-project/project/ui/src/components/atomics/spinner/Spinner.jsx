import React, { useEffect } from "react";
import { CircularProgressContainer } from "./SpinnerStyles";
import { CircularProgress } from "@mui/material";

export const Spinner = ({ message }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<CircularProgressContainer>
			<CircularProgress />
			<span>{message}</span>
		</CircularProgressContainer>
	);
};
