import { Request, Response } from "express";
import ExpenseService from "../service/ExpenseService";
import { StatusCodes } from "http-status-codes";
import Exception from "../model/Exception";
import ResponseUtils from "../utils/ResponseUtils";
import Expense from "../model/entity/Expense";

export default class ExpenseController {
	static getExpenses = async (req: Request, res: Response): Promise<void> => {
		try {
			const expenses: Expense[] = (await ExpenseService.getExpenses()) as Expense[];
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(expenses));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};

	static getExpenseById = async (req: Request, res: Response): Promise<void> => {
		try {
			const expense: Expense = (await ExpenseService.getExpenseById(Number(req.params.id), res.locals.role, res.locals.userId)) as Expense;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(expense));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};

	static createExpense = async (req: Request, res: Response): Promise<void> => {
		try {
			const expense: Expense = await ExpenseService.saveExpense(ResponseUtils.convertFromSnakeToCamel(req.body) as Expense);
			res.status(StatusCodes.CREATED).json(ResponseUtils.convertFromCamelToSnake(expense));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};

	static deleteExpenseById = async (req: Request, res: Response): Promise<void> => {
		try {
			const expense: Expense = (await ExpenseService.deleteExpenseById(
				Number(req.params.id),
				res.locals.role,
				res.locals.userId
			)) as Expense;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(expense));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};
}
