import { TYPES } from "./ActionTypes";

export const reducer = (open, action) => {
	switch (action.type) {
		case TYPES.CLICK_BUTTON_MENU:
			return !open;
		default:
			throw new Error("Action type incorrect");
	}
};
