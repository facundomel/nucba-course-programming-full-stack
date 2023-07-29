import { Router as routerExpress } from "express";
import { body } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import HandlerAuth from "./middlwares/HandlerAuth";
import RecipeCategoryController from "../controller/RecipeCategoryController";

export default class RecipeCategoryRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get("/recipes/categories", RecipeCategoryController.getRecipesCategory);

		router.post(
			"/recipes/categories",
			body("category").notEmpty().withMessage("Category is empty").isString().withMessage("Category is not string"),
			body("title").notEmpty().withMessage("Title is empty").isString().withMessage("Title is not string"),
			body("url_image").notEmpty().withMessage("URL image is empty").isString().withMessage("URL image is not string"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeCategoryController.createRecipeCategory
		);

		return router;
	};
}
