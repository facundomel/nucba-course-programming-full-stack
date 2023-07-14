import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Exception from "../model/Exception";
import ResponseUtils from "../utils/ResponseUtils";
import User from "../model/entity/User";
import UserLogin from "../model/UserLogin";
import AuthService from "../service/AuthService";

export default class AuthController {
	static login = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = await AuthService.login(ResponseUtils.convertFromSnakeToCamel(req.body) as UserLogin);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};

	static refreshToken = async (req: Request, res: Response): Promise<void> => {
		const headerAuthorization = req.headers.authorization;
		if (!headerAuthorization) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new Exception("Not authorized: Token is not present", StatusCodes.UNAUTHORIZED)));
			return;
		}
		const authorizationToken = headerAuthorization.split(" ")[1];
		try {
			const result = await AuthService.refreshToken(authorizationToken);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(result));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};
}
