import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./middlewares/HandlerValidationErrors";
import ExpenseController from "../controller/ExpenseController";
import HandlerAuth from "./middlewares/HandlerAuth";

export default class ExpensesRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get("/expenses", HandlerAuth.authenticate, HandlerAuth.authorizeAdminRole, ExpenseController.getExpenses);

		router.get(
			"/expenses/:id",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			ExpenseController.getExpenseById
		);

		router.post(
			"/expenses",
			body("name").notEmpty().withMessage("Name is empty").isString().withMessage("Name is not string"),
			body("description").isString().withMessage("Description is not string").optional(),
			body("amount").notEmpty().withMessage("Amount is empty").isNumeric().withMessage("Amount is not numeric"),
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			ExpenseController.createExpense
		);

		router.delete(
			"/expenses/:id",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			ExpenseController.deleteExpenseById
		);

		return router;
	};
}
