import { DataSource, Repository } from "typeorm";
import Database from "./database/Database";
import UserRole from "../model/entity/UserRole";

export default class UserRoleRepository {
	static userRoleRepository: Repository<UserRole>;

	static async init(dataSource: DataSource): Promise<void> {
		try {
			this.userRoleRepository = dataSource.getRepository(UserRole);
		} catch (error) {
			console.error("Error initializing UserRoleRepository: ", error);
			throw error;
		}
	}

	static getUsersRoles = async (): Promise<UserRole[]> => {
		try {
			const userRoles: UserRole[] = (await this.userRoleRepository
				.createQueryBuilder()
				.select("users_roles")
				.from(UserRole, "users_roles")
				.getMany()) as UserRole[];
			return userRoles;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserRoleById = async (userRoleId: number): Promise<UserRole> => {
		try {
			const userRole: UserRole = (await this.userRoleRepository
				.createQueryBuilder()
				.select("users_roles")
				.from(UserRole, "users_roles")
				.where("users_roles.id = :id", { id: userRoleId })
				.getOne()) as UserRole;
			return userRole;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserRoleByName = async (userRoleName: string): Promise<UserRole> => {
		try {
			const userRole: UserRole = (await this.userRoleRepository
				.createQueryBuilder()
				.select("users_roles")
				.from(UserRole, "users_roles")
				.where("users_roles.name = :name", { name: userRoleName })
				.getOne()) as UserRole;
			return userRole;
		} catch (error: any) {
			throw error;
		}
	};
}
