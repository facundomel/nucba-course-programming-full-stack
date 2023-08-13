import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../utils/ResponseUtils";
import UserService from "../service/UserService";
import User from "../model/entity/User";
import CustomException from "../model/CustomException";

export default class UserController {
	static getUsers = async (req: Request, res: Response): Promise<void> => {
		try {
			const users: User[] = (await UserService.getUsers()) as User[];
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(users));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static getUserSearch = async (req: Request, res: Response): Promise<void> => {
		try {
			if (req.query.id && req.query.email) {
				res.status(StatusCodes.BAD_REQUEST).json(new CustomException("Query not supported", StatusCodes.BAD_REQUEST));
			} else if (req.query.id) {
				const user: User = (await UserService.getUserById(Number(req.query.id), true)) as User;
				res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
			} else if (req.query.email) {
				const user: User = (await UserService.getUserByEmail(String(req.query.email), true)) as User;
				res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
			} else {
				res.status(StatusCodes.BAD_REQUEST).json(new CustomException("Missing parameter id or email", StatusCodes.BAD_REQUEST));
			}
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	// static getUserById = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const user: User = (await UserService.getUserById(Number(req.params.userId))) as User;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };

	// static getUserByEmail = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const user: User = (await UserService.getUserByEmail(req.params.userEmail)) as User;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };

	// static getExpensesByUserId = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const user: User = (await UserService.getExpensesByUserId(Number(req.params.id))) as User;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };

	static registerUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = await UserService.registerUser(ResponseUtils.convertFromSnakeToCamel(req.body) as User);
			res.status(StatusCodes.CREATED).json(ResponseUtils.convertFromCamelToSnake(user));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static updateUserPassword = async (req: Request, res: Response): Promise<void> => {
		try {
			const { userId, newPassword } = ResponseUtils.convertFromSnakeToCamel(req.body);
			const user: User = await UserService.updateUserPassword(userId, newPassword);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	// static deleteUserById = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const user: User = (await UserService.deleteUserById(Number(req.params.id))) as User;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };

	// static deleteExpensesByUserId = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const user: User = (await UserService.deleteExpensesByUserId(Number(req.params.id))) as User;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };
}
