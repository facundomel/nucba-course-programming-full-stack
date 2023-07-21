import { SET_CURRENT_USER, REMOVE_CURRENT_USER, OPEN_OR_CLOSE_MENU_SESSION_USER, SET_USER_SECTION } from "./UserActions";

const INITIAL_STATE = {
	currentUser: null,
	isOpenMenuSessionUser: false,
	userSection: "Home",
};

const userReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};

		case REMOVE_CURRENT_USER:
			return {
				...state,
				currentUser: null,
			};

		case OPEN_OR_CLOSE_MENU_SESSION_USER:
			return {
				...state,
				isOpenMenuSessionUser: !state.isOpenMenuSessionUser,
			};

		case SET_USER_SECTION:
			return {
				...state,
				userSection: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
