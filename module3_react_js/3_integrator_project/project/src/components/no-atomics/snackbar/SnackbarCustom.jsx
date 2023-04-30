import { Slide, Snackbar } from "@mui/material";
import React from "react";
import { AlertStyled } from "./SnackbarCustomStyles";

export const SnackbarCustom = ({ openSnackbar, setCloseSnackbar, severity, message }) => {
	return (
		<>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={() => setCloseSnackbar(false)}
				TransitionComponent={(props) => {
					return <Slide {...props} direction="up" />;
				}}
				key={Date.now()}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<AlertStyled severity={severity}>{message}</AlertStyled>
			</Snackbar>
		</>
	);
};
