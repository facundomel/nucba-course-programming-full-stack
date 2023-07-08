import { Router as routerExpress } from "express";
import { body } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import AuthController from "../controller/AuthController";

export default class AuthRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.post(
			"/login",
			body("email").notEmpty().withMessage("Email is empty").isEmail().withMessage("Email is not valid"),
			body("password").notEmpty().withMessage("Password is empty"),
			HandlerValidationErrors.executeValidation,
			AuthController.login
		);

		router.get("/refresh-token", AuthController.refreshToken);

		return router;
	};
}
