// import { Repository } from "typeorm";
// import Expense from "../model/entity/Expense";
// import Database from "./database/Database";

// export default class ExpenseRepository {
// 	static expenseRepository: Repository<Expense>;

// 	static {
// 		Database.getConnection()
// 			.then((dataSource) => {
// 				this.expenseRepository = dataSource.getRepository(Expense);
// 			})
// 			.catch((error: any) => {
// 				throw error;
// 			});
// 	}

// 	static getExpenses = async (): Promise<Expense[]> => {
// 		try {
// 			const expenses: Expense[] = (await this.expenseRepository
// 				.createQueryBuilder()
// 				.select("expenses")
// 				.from(Expense, "expenses")
// 				.getMany()) as unknown as Expense[];
// 			return expenses;
// 		} catch (error: any) {
// 			throw error;
// 		}
// 	};

// 	static getExpenseById = async (expenseId: number): Promise<Expense> => {
// 		try {
// 			const expense: Expense = (await this.expenseRepository
// 				.createQueryBuilder()
// 				.select("expenses")
// 				.from(Expense, "expenses")
// 				.where("expenses.id = :id", { id: expenseId })
// 				.getOne()) as Expense;
// 			return expense;
// 		} catch (error: any) {
// 			throw error;
// 		}
// 	};

// 	static saveExpense = async (newExpense: Expense): Promise<Expense> => {
// 		try {
// 			const expense: Expense = (await this.expenseRepository.save(newExpense)) as Expense;
// 			return expense;
// 		} catch (error: any) {
// 			throw error;
// 		}
// 	};

// 	static deleteExpenseById = async (expenseId: number): Promise<void> => {
// 		try {
// 			await this.expenseRepository.softDelete({ id: expenseId });
// 		} catch (error: any) {
// 			throw error;
// 		}
// 	};
// }
