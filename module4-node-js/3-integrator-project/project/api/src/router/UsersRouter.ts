import { Router as routerExpress } from "express";
import { body, param, query } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import UserController from "../controller/UserController";
import HandlerAuth from "./middlwares/HandlerAuth";

export default class UsersRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get("/users", HandlerAuth.authenticate, HandlerAuth.authorizeAdminRole, UserController.getUsers);

		router.get("/users/search", UserController.getUserSearch);

		// router.get(
		// 	"/users/email/:userEmail",
		// 	param("userEmail").isString().withMessage("User email is not string"),
		// 	HandlerValidationErrors.executeValidation,
		// 	UserController.getUserByEmail
		// );

		// router.get(
		// 	"/users/:userId",
		// 	param("userId").isNumeric().withMessage("ID is not numeric"),
		// 	HandlerValidationErrors.executeValidation,
		// 	HandlerAuth.authenticate,
		// 	HandlerAuth.authorizeAdminOrUserRole,
		// 	UserController.getUserById
		// );

		// router.get(
		// 	"/users/:userId/expenses",
		// 	param("id").isNumeric().withMessage("ID is not numeric"),
		// 	HandlerValidationErrors.executeValidation,
		// 	HandlerAuth.authenticate,
		// 	HandlerAuth.authorizeAdminOrUserRole,
		// 	UserController.getExpensesByUserId
		// );

		router.post(
			"/users",
			body("first_name").notEmpty().withMessage("First name is empty").isString().withMessage("First name is not string"),
			body("last_name").notEmpty().withMessage("Last name is empty").isString().withMessage("Last name is not string"),
			body("email").notEmpty().withMessage("Email is empty").isEmail().withMessage("Email is not valid"),
			body("password").notEmpty().withMessage("Password is empty").isStrongPassword().withMessage("Password is not strong"),
			HandlerValidationErrors.executeValidation,
			UserController.registerUser
		);

		router.put(
			"/users/password",
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			body("new_password").notEmpty().withMessage("Password is empty").isStrongPassword().withMessage("New password is not strong"),
			HandlerValidationErrors.executeValidation,
			UserController.updateUserPassword
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
