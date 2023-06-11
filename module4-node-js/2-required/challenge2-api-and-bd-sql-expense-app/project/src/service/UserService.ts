import { StatusCodes } from "http-status-codes";
import Exception from "../model/Exception";
import User from "../model/entity/User";
import UserRepository from "../repository/UserRepository";

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
			if (user == null) throw new Exception("User not found", StatusCodes.NOT_FOUND);
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static getExpensesByUserId = async (userId: number): Promise<User> => {
		try {
			const user: User = (await UserRepository.getExpensesByUserId(userId)) as User;
			if (user == null) throw new Exception("User not found", StatusCodes.NOT_FOUND);
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static saveUser = async (newUser: User): Promise<any> => {
		try {
			let user: User = (await UserRepository.getUserByDocumentNumber(newUser.documentNumber)) as User;
			if (user != null && user.deletedDate == null) throw new Exception("User already exist", StatusCodes.CONFLICT);
			user = (await UserRepository.saveUser(newUser)) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static deleteUserById = async (userId: number): Promise<User> => {
		try {
			let user: User = (await this.getUserById(userId)) as User;
			if (user.deletedDate != null) throw new Exception("User is already deleted", StatusCodes.NOT_FOUND);
			await UserRepository.deleteUserById(userId);
			user = (await this.getUserById(userId)) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static deleteExpensesByUserId = async (userId: number): Promise<User> => {
		try {
			let user: User = (await this.getExpensesByUserId(userId)) as User;
			if (user.expenses.length == 0) throw new Exception("User has not expenses", StatusCodes.INTERNAL_SERVER_ERROR);
			await UserRepository.deleteExpensesByUserId(userId);
			user = (await this.getExpensesByUserId(userId)) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};
}
