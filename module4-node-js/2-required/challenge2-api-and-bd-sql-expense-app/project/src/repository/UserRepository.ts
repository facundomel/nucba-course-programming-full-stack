import { Repository } from "typeorm";
import User from "../model/entity/User";
import AppDataSource from "./database/Database";
import Expense from "../model/entity/Expense";
import Database from "./database/Database";

export default class UserRepository {
	static userRepository: Repository<User>;
	static expenseRepository: Repository<Expense>;

	static {
		Database.getConnection()
			.then((dataSource) => {
				this.userRepository = dataSource.getRepository(User);
				this.expenseRepository = dataSource.getRepository(Expense);
			})
			.catch((error: any) => {
				throw error;
			});
	}

	static getUsers = async (): Promise<User[]> => {
		try {
			const users: User[] = (await this.userRepository
				.createQueryBuilder()
				.select("users")
				.withDeleted()
				.from(User, "users")
				.getMany()) as User[];
			return users;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserById = async (userId: number): Promise<User> => {
		try {
			const user: User = (await this.userRepository
				.createQueryBuilder()
				.select("users")
				.withDeleted()
				.from(User, "users")
				.where("users.id = :id", { id: userId })
				.getOne()) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static getUserByDocumentNumber = async (userDocumentNumber: number): Promise<User> => {
		try {
			const user: User = (await this.userRepository
				.createQueryBuilder()
				.select("users")
				.withDeleted()
				.from(User, "users")
				.where("users.document_number = :document_number", { document_number: userDocumentNumber })
				.getOne()) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static getExpensesByUserId = async (userId: number): Promise<User> => {
		try {
			const user: User = (await this.userRepository
				.createQueryBuilder()
				.select("users")
				.withDeleted()
				.from(User, "users")
				.leftJoinAndSelect("users.expenses", "expense")
				.where("users.id = :id", { id: userId })
				.getOne()) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static saveUser = async (newUser: User): Promise<User> => {
		try {
			const user: User = (await this.userRepository.save(newUser)) as User;
			return user;
		} catch (error: any) {
			throw error;
		}
	};

	static deleteUserById = async (userId: number): Promise<void> => {
		const queryRunner = (await AppDataSource.getConnection()).createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const userRepository = queryRunner.manager.getRepository(User);
			const expenseRepository = queryRunner.manager.getRepository(Expense);
			await expenseRepository.softDelete({ userId: userId });
			await userRepository.softDelete({ id: userId });
			await queryRunner.commitTransaction();
		} catch (error: any) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	};

	static deleteExpensesByUserId = async (userId: number): Promise<void> => {
		try {
			await this.expenseRepository.softDelete({ userId: userId });
		} catch (error: any) {
			throw error;
		}
	};
}
