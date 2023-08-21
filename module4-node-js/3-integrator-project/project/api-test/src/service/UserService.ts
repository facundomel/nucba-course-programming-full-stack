import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import User from "../model/entity/User";
import UserRepository from "../repository/UserRepository";
import bcrypt from "bcrypt";

export default class UserService {
	static getUsers = async (): Promise<User[]> => {
		try {
			const users: User[] = (await UserRepository.getUsers()) as User[];
			return users;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserById = async (userId: number, shouldOfuscatePass: boolean): Promise<User> => {
		try {
			const user: User = (await UserRepository.getUserById(userId, shouldOfuscatePass)) as User;
			if (user == null) throw new CustomException("User not found", StatusCodes.NOT_FOUND);
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserByEmail = async (userEmail: string, shouldOfuscatePass: boolean): Promise<User> => {
		try {
			const user: User = (await UserRepository.getUserByEmail(userEmail, shouldOfuscatePass)) as User;
			if (user == null) throw new CustomException("User not found", StatusCodes.NOT_FOUND);
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static registerUser = async (newUser: User): Promise<any> => {
		try {
			const user: User = (await UserRepository.getUserByEmail(newUser.email, false)) as User;
			if (user != null) throw new CustomException("User already exist", StatusCodes.CONFLICT);
			newUser.password = await bcrypt.hash(newUser.password, 10);
			const userCreated = (await UserRepository.registerUser(newUser)) as User;
			userCreated.password = "*****";
			return userCreated;
		} catch (error: any) {
			throw error;
		}
	};

	static updateUserPassword = async (userId: number, newPassword: string): Promise<any> => {
		try {
			let user: User = (await this.getUserById(userId, false)) as User;
			newPassword = await bcrypt.hash(newPassword, 10);
			const response = await UserRepository.updateUserPassword(userId, newPassword);
			if (response.affected > 0) {
				user.password = "*****";
				return user;
			}
		} catch (error: any) {
			throw error;
		}
	};
}
