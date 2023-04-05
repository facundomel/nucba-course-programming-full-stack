export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const OPEN_LOGIN_MENU_SESSION_USER = "OPEN_LOGIN_MENU_SESSION_USER";

export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER,
	payload: user,
});

export const removeCurrentUser = () => ({
	type: REMOVE_CURRENT_USER,
});

export const openLoginMenuSessionUser = () => ({
	type: OPEN_LOGIN_MENU_SESSION_USER,
});
