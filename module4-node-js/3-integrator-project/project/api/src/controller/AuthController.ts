import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import ResponseUtils from "../utils/ResponseUtils";
import User from "../model/entity/User";
import UserLogin from "../model/LoginUser";
import AuthService from "../service/AuthService";

export default class AuthController {
	static login = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = await AuthService.login(ResponseUtils.convertFromSnakeToCamel(req.body) as UserLogin);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static refreshToken = async (req: Request, res: Response): Promise<void> => {
		const headerAuthorization = req.headers.authorization;
		if (!headerAuthorization) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new CustomException("Not authorized: Token is not present", StatusCodes.UNAUTHORIZED)));
			return;
		}
		const authorizationToken = headerAuthorization.split(" ")[1];
		try {
			const result = await AuthService.refreshToken(authorizationToken);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(result));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};
}
