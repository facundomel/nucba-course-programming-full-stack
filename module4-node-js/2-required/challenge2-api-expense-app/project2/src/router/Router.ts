import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./HandlerValidationErrors";
import UserController from "../controller/UserController";
import ExpenseController from "../controller/ExpenseController";

export default class Router {
	static init = (): routerExpress => {
		const router = routerExpress();

		// Users
		router.get("/users", UserController.getUsers);
		router.get(
			"/users/:id",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			UserController.getUserById
		);
		router.get(
			"/users/:id/expenses",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			UserController.getExpensesByUserId
		);
		router.post(
			"/users",
			body("first_name").notEmpty().withMessage("First name is empty").isString().withMessage("First name is not string"),
			body("last_name").notEmpty().withMessage("Last name is empty").isString().withMessage("Last name is not string"),
			body("document_number").notEmpty().withMessage("Document number is empty").isNumeric().withMessage("Document number is not numeric"),
			HandlerValidationErrors.executeValidation,
			UserController.saveUser
		);
		router.delete(
			"/users/:id",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			UserController.deleteUserById
		);
		router.delete(
			"/users/:id/expenses",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			UserController.deleteExpensesByUserId
		);

		// Expenses
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
