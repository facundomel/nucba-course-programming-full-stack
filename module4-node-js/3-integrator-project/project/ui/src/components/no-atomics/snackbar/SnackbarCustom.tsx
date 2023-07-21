import { Slide, Snackbar } from "@mui/material";
import { AlertStyled } from "./SnackbarCustomStyles";

interface SnackbarCustomProps {
	open: boolean;
	onClose: () => void;
	severity: string;
	message: string;
	autoHideDuration?: number;
}

const SnackbarCustom = ({ open, onClose, severity, message, autoHideDuration = 2000 }: SnackbarCustomProps) => {
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
