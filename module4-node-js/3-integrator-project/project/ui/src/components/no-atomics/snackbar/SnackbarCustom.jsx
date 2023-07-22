import { Slide, Snackbar } from "@mui/material";
import React from "react";
import { AlertStyled } from "./SnackbarCustomStyles";

const SnackbarCustom = ({ open, onClose, severity, message, autoHideDuration = 2000 }) => {
	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={autoHideDuration}
				onClose={() => onClose()}
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

export default SnackbarCustom;
