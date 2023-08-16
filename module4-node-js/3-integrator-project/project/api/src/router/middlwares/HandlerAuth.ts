import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Utils from "../../utils/Utils";
import CustomException from "../../model/CustomException";
import jwt from "jsonwebtoken";
import Config from "../../config/Config";
import CurrentUser from "../../model/CurrentUser";
import { UserRoleStringEnum } from "../../model/enum/UserRoleEnum";
import AuthService from "../../service/AuthService";

export default class HandlerAuth {
	//AUTENTICACION
	static authenticate = async (req: Request, res: Response, next: NextFunction) => {
		const accessTokenSecret = Config.getInstance().accessTokenSecret;
		const headerAuthorization = req.headers.authorization;

		if (!headerAuthorization) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(Utils.convertFromCamelToSnake(new CustomException("Not authorized: Access token is not present", StatusCodes.UNAUTHORIZED)));
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
					.json(Utils.convertFromCamelToSnake(new CustomException("Not authorized: Access token expired", StatusCodes.UNAUTHORIZED)));
				return;
			}
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(Utils.convertFromCamelToSnake(new CustomException("Not authorized: Access token is not valid", StatusCodes.UNAUTHORIZED)));
		}
	};

	//AUTORIZACION
	static authorizeAdminRole = async (req: Request, res: Response, next: NextFunction) => {
		const currentUser: CurrentUser = res.locals.currentUser;
		if (currentUser.role && currentUser.role != UserRoleStringEnum.ADMIN) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(Utils.convertFromCamelToSnake(new CustomException("Not authorized: Need admin role", StatusCodes.UNAUTHORIZED)));
			return;
		}
		next();
	};

	static authorizeUserRole = async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id
			? req.params.id
			: Utils.convertFromSnakeToCamel(req.body).userId
			? Utils.convertFromSnakeToCamel(req.body).userId
			: null;

		const currentUser: CurrentUser = res.locals.currentUser;
		if (currentUser.role && currentUser.role == UserRoleStringEnum.USER && currentUser.userId != userId) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(Utils.convertFromCamelToSnake(new CustomException("User not authorized", StatusCodes.UNAUTHORIZED)));
			return;
		}
		next();
	};

	static authorizeAdminOrUserRole = async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.userId
			? req.params.userId
			: Utils.convertFromSnakeToCamel(req.body).userId
			? Utils.convertFromSnakeToCamel(req.body).userId
			: null;

		const currentUser: CurrentUser = res.locals.currentUser;

		if (
			(currentUser.role && currentUser.role == UserRoleStringEnum.ADMIN) ||
			(currentUser.role && currentUser.role == UserRoleStringEnum.USER && currentUser.userId == Number(userId))
		) {
			next();
			return;
		}

		res
			.status(StatusCodes.UNAUTHORIZED)
			.json(Utils.convertFromCamelToSnake(new CustomException("User not authorized", StatusCodes.UNAUTHORIZED)));
	};
}
