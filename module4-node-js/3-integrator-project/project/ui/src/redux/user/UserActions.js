export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const OPEN_OR_CLOSE_MENU_SESSION_USER = "OPEN_OR_CLOSE_MENU_SESSION_USER";
export const SET_USER_SECTION = "SET_USER_SECTION";
export const SET_USER_FORGOT_PASSWORD = "SET_USER_FORGOT_PASSWORD";
export const REMOVE_USER_FORGOT_PASSWORD = "REMOVE_USER_FORGOT_PASSWORD";

export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER,
	payload: user,
});

export const removeCurrentUser = () => ({
	type: REMOVE_CURRENT_USER,
});

export const openOrCloseMenuSessionUser = () => ({
	type: OPEN_OR_CLOSE_MENU_SESSION_USER,
});

export const setUserSection = (userSection) => ({
	type: SET_USER_SECTION,
	payload: userSection,
});

export const setUserForgotPassword = (user) => ({
	type: SET_USER_FORGOT_PASSWORD,
	payload: user,
});

export const removeUserForgotPassword = () => ({
	type: REMOVE_USER_FORGOT_PASSWORD,
});
