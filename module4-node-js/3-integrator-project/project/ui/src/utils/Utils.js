import humps from "humps";
import * as snackbarActions from "../redux/snackbar/SnackbarActions.js";
import CustomException from "../model/CustomException.js";

export default class Utils {
	static convertFromSnakeToCamel(data) {
		return humps.camelizeKeys(data);
	}

	static convertFromCamelToSnake(data) {
		return humps.decamelizeKeys(data);
	}

	static setSnackbarError(error, dispatch) {
		dispatch(
			snackbarActions.setOptionsSnackbar({
				open: true,
				severity: "error",
				message: error instanceof CustomException ? `${error.message}` : `Ha ocurrido un error inesperado. Vuelva a intentarlo más tarde.`,
				autoHideDuration: 3000,
			})
		);
	}
}
