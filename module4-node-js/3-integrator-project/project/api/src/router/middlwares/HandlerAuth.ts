import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../../utils/ResponseUtils";
import CustomException from "../../model/CustomException";
import jwt from "jsonwebtoken";
import UserRole from "../../model/enum/UserRoleEnum";
import Config from "../../config/Config";
import CurrentUser from "../../model/CurrentUser";

export default class HandlerAuth {
	//AUTENTICACION
	static authenticate = async (req: Request, res: Response, next: NextFunction) => {
		const accessTokenSecret = Config.getInstance().accessTokenSecret;
		const headerAuthorization = req.headers.authorization;

		if (!headerAuthorization) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new CustomException("Not authorized: Token is not present", StatusCodes.UNAUTHORIZED)));
			return;
		}

		const authorizationToken = headerAuthorization.split(" ")[1];
		try {
			const result: any = jwt.verify(authorizationToken, accessTokenSecret);
			if (result) {
				res.locals.currentUser = new CurrentUser(result);

				next();
				return;
			}
		} catch (err: any) {
			if (err.name == "TokenExpiredError") {
				res
					.status(StatusCodes.UNAUTHORIZED)
					.json(ResponseUtils.convertFromCamelToSnake(new CustomException("Not authorized: Token expired", StatusCodes.UNAUTHORIZED)));
				return;
			}
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new CustomException("Not authorized: Token is not valid", StatusCodes.UNAUTHORIZED)));
		}
	};

	//AUTORIZACION
	static authorizeAdminRole = async (req: Request, res: Response, next: NextFunction) => {
		const currentUser: CurrentUser = res.locals.currentUser;
		if (currentUser.role && currentUser.role != UserRole.ADMIN) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new CustomException("Not authorized: Need admin role", StatusCodes.UNAUTHORIZED)));
			return;
		}
		next();
	};

	static authorizeUserRole = async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id
			? req.params.id
			: ResponseUtils.convertFromSnakeToCamel(req.body).userId
			? ResponseUtils.convertFromSnakeToCamel(req.body).userId
			: null;

		const currentUser: CurrentUser = res.locals.currentUser;
		if (currentUser.role && currentUser.role == UserRole.USER && currentUser.userId != userId) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new CustomException("User not authorized", StatusCodes.UNAUTHORIZED)));
			return;
		}
		next();
	};

	static authorizeAdminOrUserRole = async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id
			? req.params.id
			: ResponseUtils.convertFromSnakeToCamel(req.body).userId
			? ResponseUtils.convertFromSnakeToCamel(req.body).userId
			: null;

		const currentUser: CurrentUser = res.locals.currentUser;
		if (
			(currentUser.role && currentUser.role == UserRole.ADMIN) ||
			(currentUser.role && currentUser.role == UserRole.USER && currentUser.userId == userId)
		) {
			next();
			return;
		}

		res
			.status(StatusCodes.UNAUTHORIZED)
			.json(ResponseUtils.convertFromCamelToSnake(new CustomException("User not authorized", StatusCodes.UNAUTHORIZED)));
	};
}
