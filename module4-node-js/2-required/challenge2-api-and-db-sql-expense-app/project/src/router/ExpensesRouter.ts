import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./validation/HandlerValidationErrors";
import ExpenseController from "../controller/ExpenseController";

export default class ExpensesRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get("/expenses", ExpenseController.getExpenses);
		router.get(
			"/expenses/:id",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			ExpenseController.getExpenseById
		);
		router.post(
			"/expenses",
			body("name").notEmpty().withMessage("Name is empty").isString().withMessage("Name is not string"),
			body("description").isString().withMessage("Description is not string").optional(),
			body("amount").notEmpty().withMessage("Amount is empty").isNumeric().withMessage("Amount is not numeric"),
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			ExpenseController.saveExpense
		);
		router.delete(
			"/expenses/:id",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			ExpenseController.deleteExpenseById
		);

		return router;
	};
}
