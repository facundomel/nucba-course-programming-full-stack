import { SET_CURRENT_USER, REMOVE_CURRENT_USER, OPEN_LOGIN_MENU_SESSION_USER } from "./UserActions";

const INITIAL_STATE = {
	currentUser: null,
	isOpenLoginMenuSessionUser: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
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

		case OPEN_LOGIN_MENU_SESSION_USER:
			return {
				...state,
				isOpenLoginMenuSessionUser: !state.isOpenLoginMenuSessionUser,
			};

		default:
			return state;
	}
};

export default userReducer;
