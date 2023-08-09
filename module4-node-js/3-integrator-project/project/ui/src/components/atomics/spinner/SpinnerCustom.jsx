import React, { useEffect } from "react";
import { SpinnerCustomContainer } from "./SpinnerCustomStyles";
import { CircularProgress } from "@mui/material";

export const SpinnerCustom = ({ message }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<SpinnerCustomContainer>
			<CircularProgress />
			<span>{message}</span>
		</SpinnerCustomContainer>
	);
};
