import { RecipePageSection } from "../../model/enum/PageSection";
import {
	SET_CURRENT_USER,
	REMOVE_CURRENT_USER,
	OPEN_OR_CLOSE_MENU_SESSION_USER,
	SET_USER_SECTION,
	SET_USER_FORGOT_PASSWORD,
	REMOVE_USER_FORGOT_PASSWORD,
} from "./UserActions";

const INITIAL_STATE = {
	currentUser: null,
	isOpenMenuSessionUser: false,
	userSection: RecipePageSection.RecipeAll,
	userForgotPassword: null,
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

		case SET_USER_FORGOT_PASSWORD:
			return {
				...state,
				userForgotPassword: action.payload,
			};

		case REMOVE_USER_FORGOT_PASSWORD:
			return {
				...state,
				userForgotPassword: null,
			};

		default:
			return state;
	}
};

export default userReducer;
