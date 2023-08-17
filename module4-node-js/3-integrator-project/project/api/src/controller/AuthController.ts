import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import Utils from "../utils/Utils";
import UserLogin from "../model/LoginUser";
import AuthService from "../service/AuthService";
import ResponseUtils from "../utils/ResponseUtils";

export default class AuthController {
	static login = async (req: Request, res: Response): Promise<void> => {
		try {
			const userAndAuthToken: any = await AuthService.login(Utils.convertFromSnakeToCamel(req.body) as UserLogin);
			ResponseUtils.ok(res, userAndAuthToken);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static refreshToken = async (req: Request, res: Response): Promise<void> => {
		const headerAuthorization = req.headers.authorization;
		if (!headerAuthorization) {
			ResponseUtils.forbidden(res, new CustomException("Not authorized: Refresh token is not present", StatusCodes.FORBIDDEN));
			return;
		}
		const authorizationToken = headerAuthorization.split(" ")[1];
		try {
			const userAndAuthToken = await AuthService.refreshToken(authorizationToken);
			ResponseUtils.ok(res, userAndAuthToken);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};
}
