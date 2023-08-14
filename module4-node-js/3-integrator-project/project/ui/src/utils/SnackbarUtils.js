import * as snackbarActions from "../redux/snackbar/SnackbarActions.js";
import CustomException from "../model/CustomException.js";

export default class SnackbarUtils {
	static success(message, autoHideDuration, dispatch) {
		dispatch(
			snackbarActions.setOptionsSnackbar({
				open: true,
				severity: "success",
				message: message,
				autoHideDuration: autoHideDuration,
			})
		);
	}

	static info(message, autoHideDuration, dispatch) {
		dispatch(
			snackbarActions.setOptionsSnackbar({
				open: true,
				severity: "info",
				message: message,
				autoHideDuration: autoHideDuration,
			})
		);
	}

	static warning(message, autoHideDuration, dispatch) {
		dispatch(
			snackbarActions.setOptionsSnackbar({
				open: true,
				severity: "warning",
				message: message,
				autoHideDuration: autoHideDuration,
			})
		);
	}

	static error(error, autoHideDuration, dispatch) {
		dispatch(
			snackbarActions.setOptionsSnackbar({
				open: true,
				severity: "error",
				message: error instanceof CustomException ? `${error.message}` : `Ha ocurrido un error inesperado. Vuelva a intentarlo más tarde.`,
				autoHideDuration: autoHideDuration,
			})
		);
	}
}
