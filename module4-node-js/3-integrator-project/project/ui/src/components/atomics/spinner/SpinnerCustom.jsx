import React, { useEffect } from "react";
import { SpinnerCustomContainer } from "./SpinnerCustomStyles";
import { CircularProgress } from "@mui/material";

export const SpinnerCustom = ({ message, size, gap, height, color }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<SpinnerCustomContainer gap={gap} height={height} color={color}>
			<CircularProgress size={size} />
			<span>{message}</span>
		</SpinnerCustomContainer>
	);
};
