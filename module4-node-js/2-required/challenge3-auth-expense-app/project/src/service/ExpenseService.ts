import { StatusCodes } from "http-status-codes";
import Exception from "../model/Exception";
import Expense from "../model/entity/Expense";
import ExpenseRepository from "../repository/ExpenseRepository";
import UserRole from "../model/enum/RoleUser";

export default class ExpenseService {
	static getExpenses = async (): Promise<Expense[]> => {
		try {
			const expenses: Expense[] = (await ExpenseRepository.getExpenses()) as Expense[];
			return expenses;
		} catch (error: any) {
			throw error;
		}
	};

	static getExpenseById = async (expenseId: number, userRole: UserRole, userIdSession: number): Promise<Expense> => {
		try {
			const expense: Expense = (await ExpenseRepository.getExpenseById(expenseId)) as Expense;
			if (expense == null) throw new Exception("Expense not found", StatusCodes.NOT_FOUND);
			if ((userRole && userRole == UserRole.ADMIN) || (userRole && userRole == UserRole.USER && expense.userId == userIdSession)) {
				return expense;
			}
			throw new Exception("User not authorized", StatusCodes.UNAUTHORIZED);
		} catch (error: any) {
			throw error;
		}
	};

	static saveExpense = async (newExpense: Expense): Promise<Expense> => {
		try {
			const expense: Expense = await ExpenseRepository.saveExpense(newExpense);
			return expense;
		} catch (error: any) {
			throw error;
		}
	};

	static deleteExpenseById = async (expenseId: number, userRole: UserRole, userIdSession: number): Promise<Expense> => {
		try {
			let expense: Expense = (await this.getExpenseById(expenseId, userRole, userIdSession)) as Expense;
			if (expense.deletedDate != null) throw new Exception("Expense is already deleted", StatusCodes.CONFLICT);
			await ExpenseRepository.deleteExpenseById(expenseId);
			expense = (await this.getExpenseById(expenseId, userRole, userIdSession)) as Expense;
			return expense;
		} catch (error: any) {
			throw error;
		}
	};
}
