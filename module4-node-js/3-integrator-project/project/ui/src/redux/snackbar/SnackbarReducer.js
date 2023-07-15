import { SET_OPTIONS_SNACKBAR } from "./SnackbarActions";

const INITIAL_STATE = {
	optionsSnackbar: { open: false, onClose: null, severity: null, message: null, autoHideDuration: null },
};

const snackbarReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_OPTIONS_SNACKBAR:
			return {
				...state,
				optionsSnackbar: action.payload,
			};

		default:
			return state;
	}
};

export default snackbarReducer;
