import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Utils from "../../utils/Utils";
import CustomException from "../../model/CustomException";
import jwt from "jsonwebtoken";
import Config from "../../config/Config";
import CurrentUser from "../../model/CurrentUser";
import { UserRoleStringEnum } from "../../model/enum/UserRoleEnum";
import ResponseUtils from "../../utils/ResponseUtils";

export default class HandlerAuth {
	//AUTENTICACION
	static authenticate = async (req: Request, res: Response, next: NextFunction) => {
		const accessTokenSecret = Config.getInstance().accessTokenSecret;
		const headerAuthorization = req.headers.authorization;

		if (!headerAuthorization) {
			ResponseUtils.unauthorized(res, new CustomException("Not authenticated: Access token is not present", StatusCodes.UNAUTHORIZED));
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
				ResponseUtils.unauthorized(res, new CustomException("Not authenticated: Access token expired", StatusCodes.UNAUTHORIZED));
				return;
			}
			ResponseUtils.unauthorized(res, new CustomException("Not authenticated: Access token is not valid", StatusCodes.UNAUTHORIZED));
		}
	};

	//AUTORIZACION
	static authorizeAdminRole = async (req: Request, res: Response, next: NextFunction) => {
		const userId = Utils.convertFromSnakeToCamel(req.body).userId;

		const currentUser: CurrentUser = res.locals.currentUser;

		if (userId) {
			if (currentUser.role && currentUser.role == UserRoleStringEnum.ADMIN && currentUser.userId == Number(userId)) {
				next();
				return;
			}
		} else {
			if (currentUser.role && currentUser.role == UserRoleStringEnum.ADMIN) {
				next();
				return;
			}
		}

		ResponseUtils.forbidden(res, new CustomException("Not authorized: Need admin role", StatusCodes.FORBIDDEN));
	};

	static authorizeUserRole = async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id
			? req.params.id
			: Utils.convertFromSnakeToCamel(req.body).userId
			? Utils.convertFromSnakeToCamel(req.body).userId
			: null;

		const currentUser: CurrentUser = res.locals.currentUser;
		if (currentUser.role && currentUser.role == UserRoleStringEnum.USER && currentUser.userId != userId) {
			ResponseUtils.forbidden(res, new CustomException("User not authorized", StatusCodes.FORBIDDEN));
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

		ResponseUtils.forbidden(res, new CustomException("User not authorized", StatusCodes.FORBIDDEN));
	};
}
