import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Utils from "../utils/Utils";
import UserService from "../service/UserService";
import User from "../model/entity/User";
import CustomException from "../model/CustomException";
import ResponseUtils from "../utils/ResponseUtils";

export default class UserController {
	static getUserSearch = async (req: Request, res: Response): Promise<void> => {
		try {
			const userId = req.query.id;
			const userEmail = req.query.email;

			if (userId && userEmail) {
				ResponseUtils.badRequest(res, new CustomException("Query not supported", StatusCodes.BAD_REQUEST));
			} else if (userId) {
				const user: User = (await UserService.getUserById(Number(userId), true)) as User;
				ResponseUtils.ok(res, user);
			} else if (userEmail) {
				if (!isNaN(Number(userEmail))) {
					ResponseUtils.badRequest(res, new CustomException("Email is not string", StatusCodes.BAD_REQUEST));
					return;
				}
				const user: User = (await UserService.getUserByEmail(String(userEmail), true)) as User;
				ResponseUtils.ok(res, user);
			} else {
				const users: User[] = (await UserService.getUsers()) as User[];
				ResponseUtils.ok(res, users);
			}
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static registerUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const user: User = await UserService.registerUser(Utils.convertFromSnakeToCamel(req.body) as User);
			ResponseUtils.created(res, user);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static updateUserPassword = async (req: Request, res: Response): Promise<void> => {
		try {
			const { userId, newPassword } = Utils.convertFromSnakeToCamel(req.body);
			const user: User = await UserService.updateUserPassword(userId, newPassword);
			ResponseUtils.ok(res, user);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};
}
