import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import UserController from "../controller/UserController";
import HandlerAuth from "./middlwares/HandlerAuth";

export default class UsersRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get("/users", HandlerAuth.authenticate, HandlerAuth.authorizeAdminRole, UserController.getUsers);

		router.get(
			"/users/:id",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			UserController.getUserById
		);

		router.get(
			"/users/:id/expenses",
			param("id").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			UserController.getExpensesByUserId
		);

		router.post(
			"/users",
			body("first_name").notEmpty().withMessage("First name is empty").isString().withMessage("First name is not string"),
			body("last_name").notEmpty().withMessage("Last name is empty").isString().withMessage("Last name is not string"),
			body("email").notEmpty().withMessage("Email is empty").isEmail().withMessage("Email is not valid"),
			body("password").notEmpty().withMessage("Password is empty").isStrongPassword().withMessage("Password is not strong"),
			body("role_id").notEmpty().withMessage("Role ID is empty").isNumeric().withMessage("Role ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			UserController.registerUser
		);

		// router.delete(
		// 	"/users/:id",
		// 	param("id").isNumeric().withMessage("ID is not numeric"),
		// 	HandlerValidationErrors.executeValidation,
		// 	HandlerAuth.authenticate,
		// 	HandlerAuth.authorizeAdminOrUserRole,
		// 	UserController.deleteUserById
		// );

		// router.delete(
		// 	"/users/:id/expenses",
		// 	param("id").isNumeric().withMessage("ID is not numeric"),
		// 	HandlerValidationErrors.executeValidation,
		// 	HandlerAuth.authenticate,
		// 	HandlerAuth.authorizeAdminOrUserRole,
		// 	UserController.deleteExpensesByUserId
		// );

		return router;
	};
}
