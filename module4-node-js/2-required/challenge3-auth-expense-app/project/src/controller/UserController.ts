import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../utils/ResponseUtils";
import UserService from "../service/UserService";
import User from "../model/entity/User";

export default class UserController {
	static getUsers = async (req: Request, res: Response): Promise<void> => {
		try {
			const users: User[] = (await UserService.getUsers()) as User[];
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(users));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static getUserById = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = (await UserService.getUserById(Number(req.params.id))) as User;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static getExpensesByUserId = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = (await UserService.getExpensesByUserId(Number(req.params.id))) as User;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
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

	static deleteUserById = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = (await UserService.deleteUserById(Number(req.params.id))) as User;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static deleteExpensesByUserId = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = (await UserService.deleteExpensesByUserId(Number(req.params.id))) as User;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(user));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};
}
