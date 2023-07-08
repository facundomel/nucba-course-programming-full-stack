import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../../utils/ResponseUtils";
import Exception from "../../model/Exception";
import jwt from "jsonwebtoken";
import UserRole from "../../model/enum/RoleUser";

export default class HandlerAuth {
	//AUTENTICACION
	static authenticate = async (req: Request, res: Response, next: NextFunction) => {
		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
		const headerAuthorization = req.headers.authorization;
		if (!headerAuthorization) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new Exception("Not authorized: Token is not present", StatusCodes.UNAUTHORIZED)));
			return;
		}

		const authorizationToken = headerAuthorization.split(" ")[1];
		try {
			const result: any = jwt.verify(authorizationToken, accessTokenSecret);
			if (result) {
				res.locals.userId = result.userId;
				res.locals.email = result.email;
				res.locals.role = result.role;

				next();
				return;
			}
		} catch (err: any) {
			if (err.name == "TokenExpiredError") {
				res
					.status(StatusCodes.UNAUTHORIZED)
					.json(ResponseUtils.convertFromCamelToSnake(new Exception("Not authorized: Token expired", StatusCodes.UNAUTHORIZED)));
				return;
			}
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new Exception("Not authorized: Token is not valid", StatusCodes.UNAUTHORIZED)));
		}
	};

	//AUTORIZACION
	static authorizeAdminRole = async (req: Request, res: Response, next: NextFunction) => {
		if (res.locals.role && res.locals.role != UserRole.ADMIN) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new Exception("Not authorized: Need admin role", StatusCodes.UNAUTHORIZED)));
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

		if (res.locals.role && res.locals.role == UserRole.USER && userId != res.locals.userId) {
			res
				.status(StatusCodes.UNAUTHORIZED)
				.json(ResponseUtils.convertFromCamelToSnake(new Exception("User not authorized", StatusCodes.UNAUTHORIZED)));
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

		if (
			(res.locals.role && res.locals.role == UserRole.ADMIN) ||
			(res.locals.role && res.locals.role == UserRole.USER && userId == res.locals.userId)
		) {
			next();
			return;
		}

		res
			.status(StatusCodes.UNAUTHORIZED)
			.json(ResponseUtils.convertFromCamelToSnake(new Exception("User not authorized", StatusCodes.UNAUTHORIZED)));
	};
}
