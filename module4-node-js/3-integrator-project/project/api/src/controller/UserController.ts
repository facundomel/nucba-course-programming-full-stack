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
			const userId = req.query.id;
			const userEmail = req.query.email;

			if (userId && userEmail) {
				res.status(StatusCodes.BAD_REQUEST).json(new CustomException("Query not supported", StatusCodes.BAD_REQUEST));
			} else if (userId) {
				const user: User = (await UserService.getUserById(Number(userId), true)) as User;
				res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
			} else if (userEmail) {
				if (!isNaN(Number(userEmail))) {
					res.status(StatusCodes.BAD_REQUEST).json(new CustomException("Email is not string", StatusCodes.BAD_REQUEST));
					return;
				}
				const user: User = (await UserService.getUserByEmail(String(userEmail), true)) as User;
				res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
			} else {
				const users: User[] = (await UserService.getUsers()) as User[];
				res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(users));
			}
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

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
}
