import { DataSource, Repository } from "typeorm";
import User from "../model/entity/User";

export default class UserRepository {
	static userRepository: Repository<User>;
	private static readonly fieldsUserToGet = [
		"users.id",
		"users.firstName",
		"users.lastName",
		"users.email",
		"users.createdDate",
		"users.updatedDate",
		"users.deletedDate",
		"users.roleId",
	];

	static init = async (dataSource: DataSource) => {
		try {
			this.userRepository = dataSource.getRepository(User);
		} catch (error) {
			console.error("Error initializing UserRepository: ", error);
			throw error;
		}
	};

	static getUsers = async (): Promise<User[]> => {
		try {
			const users: User[] = (await this.userRepository
				.createQueryBuilder()
				.select(this.fieldsUserToGet)
				.from(User, "users")
				.orderBy("users.firstName")
				.addOrderBy("users.lastName")
				.getMany()) as User[];
			return users;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserById = async (userId: number, shouldOfuscatePass: boolean): Promise<User> => {
		try {
			const fieldsSelect: any = shouldOfuscatePass ? this.fieldsUserToGet : "users";

			const user: User = (await this.userRepository
				.createQueryBuilder()
				.select(fieldsSelect)
				.from(User, "users")
				.where("users.id = :id", { id: userId })
				.getOne()) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserByEmail = async (email: string, shouldOfuscatePass: boolean): Promise<User> => {
		try {
			const fieldsSelect: any = shouldOfuscatePass ? this.fieldsUserToGet : "users";

			const user: User = (await this.userRepository
				.createQueryBuilder()
				.select(fieldsSelect)
				.from(User, "users")
				.where("users.email = :email", { email: email })
				.getOne()) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static registerUser = async (newUser: User): Promise<User> => {
		try {
			const user: User = (await this.userRepository.save(newUser)) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static updateUserPassword = async (userId: number, newPassword: string): Promise<any> => {
		try {
			const result = await this.userRepository.update(userId, { password: newPassword });
			return result;
		} catch (error: any) {
			throw error;
		}
	};
}
