import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import User from "../model/entity/User";
import UserRepository from "../repository/UserRepository";
import bcrypt from "bcrypt";
import UserRole from "../model/entity/UserRole";
import UserRoleService from "./UserRoleService";

export default class UserService {
	static getUsers = async (): Promise<User[]> => {
		try {
			const users: User[] = (await UserRepository.getUsers()) as User[];
			return users;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserById = async (userId: number): Promise<User> => {
		try {
			const user: User = (await UserRepository.getUserById(userId)) as User;
			if (user == null) throw new CustomException("User not found", StatusCodes.NOT_FOUND);
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserByEmail = async (userEmail: string): Promise<User> => {
		try {
			const user: User = (await UserRepository.getUserByEmail(userEmail)) as User;
			if (user == null) throw new CustomException("User not found", StatusCodes.NOT_FOUND);
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static getExpensesByUserId = async (userId: number): Promise<User> => {
		try {
			const user: User = (await UserRepository.getExpensesByUserId(userId)) as User;
			if (user == null) throw new CustomException("User not found", StatusCodes.NOT_FOUND);
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static registerUser = async (newUser: User): Promise<any> => {
		try {
			let user: User = (await UserRepository.getUserByEmail(newUser.email)) as User;
			if (user != null) throw new CustomException("User already exist", StatusCodes.CONFLICT);
			await UserRoleService.getUserRoleById(newUser.roleId)
			newUser.password = await bcrypt.hash(newUser.password, 10);
			user = (await UserRepository.registerUser(newUser)) as User;
			user.password = "*****";
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	// static deleteUserById = async (userId: number): Promise<User> => {
	// 	try {
	// 		let user: User = (await this.getUserById(userId)) as User;
	// 		if (user.deletedDate != null) throw new CustomException("User is already deleted", StatusCodes.CONFLICT);
	// 		await UserRepository.deleteUserById(userId);
	// 		user = (await this.getUserById(userId)) as User;
	// 		return user;
	// 	} catch (error: any) {
	// 		throw error;
	// 	}
	// };

	// static deleteExpensesByUserId = async (userId: number): Promise<User> => {
	// 	try {
	// 		let user: User = (await this.getExpensesByUserId(userId)) as User;
	// 		if (user.expenses.length == 0) throw new CustomException("User has not expenses", StatusCodes.CONFLICT);
	// 		await UserRepository.deleteExpensesByUserId(userId);
	// 		user = (await this.getExpensesByUserId(userId)) as User;
	// 		return user;
	// 	} catch (error: any) {
	// 		throw error;
	// 	}
	// };
}
