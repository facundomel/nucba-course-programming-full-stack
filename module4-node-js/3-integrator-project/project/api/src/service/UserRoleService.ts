import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import User from "../model/entity/User";
import UserRepository from "../repository/UserRepository";
import UserRole from "../model/entity/UserRole";
import UserRoleRepository from "../repository/UserRoleRepository";

export default class UserRoleService {
	static getUserRoles = async (): Promise<UserRole[]> => {
		try {
			const userRoles: UserRole[] = (await UserRoleRepository.getUserRoles()) as UserRole[];
			return userRoles;
		} catch (error: any) {
			throw error;
		}
	};

  static getUserRoleById = async (userRoleId: number): Promise<UserRole> => {
		try {
			const userRole: UserRole = (await UserRoleRepository.getUserRoleById(userRoleId)) as UserRole;
			if (userRole == null) throw new CustomException("User role not found", StatusCodes.NOT_FOUND);
			return userRole;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserRoleByName = async (userRoleName: string): Promise<UserRole> => {
		try {
			const userRole: UserRole = (await UserRoleRepository.getUserRoleByName(userRoleName)) as UserRole;
			if (userRole == null) throw new CustomException("User role not found", StatusCodes.NOT_FOUND);
			return userRole;
		} catch (error: any) {
			throw error;
		}
	};
}
