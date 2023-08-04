import Configs from "../configs/Configs";
import Utils from "../utils/Utils";
import axios, { HttpStatusCode } from "axios";
import * as userActions from "../redux/user/UserActions.js";
import * as snackbarActions from "../redux/snackbar/SnackbarActions.js";
import UserSession from "../model/UserSession";

export default class AuthService {
	static utils = new Utils();
	static baseUrl = new Configs().baseUrlLocal;

	static loginUser = async (userLogin) => {
		try {
			const response = await axios.post(`${this.baseUrl}/api/login`, this.utils.convertFromCamelToSnake(userLogin), {
				headers: this.utils.getHeadersDefault(),
			});
			return this.utils.convertFromSnakeToCamel(response.data);
		} catch (err) {
			throw err;
		}
	};

	static refreshToken = async (refreshToken, navigate, dispatch) => {
		try {
			const headers = {
				...this.utils.getHeadersDefault(),
				authorization: `Bearer ${refreshToken}`,
			};
			let response = await axios.post(`${this.baseUrl}/api/refresh-token`, null, {
				headers: headers,
			});

			response = this.utils.convertFromSnakeToCamel(response.data);
			dispatch(userActions.setCurrentUser(new UserSession(response)));
			return response;
		} catch (err) {
			const errResponseData = err.response?.data && this.utils.convertFromSnakeToCamel(err.response.data);
			if (
				errResponseData &&
				errResponseData.statusCode === HttpStatusCode.Unauthorized &&
				errResponseData.message === "Not authorized: Refresh token expired"
			) {
				dispatch(userActions.removeCurrentUser());
				navigate("/recetas/1");
				dispatch(
					snackbarActions.setOptionsSnackbar({
						open: true,
						severity: "info",
						message: `¡La sesión ha caducado!`,
						autoHideDuration: 2500,
					})
				);
			}
			throw err;
		}
	};
}
