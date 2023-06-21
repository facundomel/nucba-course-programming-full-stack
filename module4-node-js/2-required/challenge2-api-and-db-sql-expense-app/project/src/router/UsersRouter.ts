import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./validation/HandlerValidationErrors";
import UserController from "../controller/UserController";

export default class UsersRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

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

		return router;
	};
}
