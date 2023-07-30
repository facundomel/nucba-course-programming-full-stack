import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import HandlerAuth from "./middlwares/HandlerAuth";
import RecipeController from "../controller/RecipeController";

export default class RecipeRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

    router.get("/recipes", RecipeController.getRecipes); 

		router.get(
			"/recipes/:recipeId",
			param("recipeId").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			RecipeController.getRecipeById
		);
		
		router.post(
			"/recipes",
			body("title").notEmpty().withMessage("Title is empty").isString().withMessage("Title is not string"),
			body("description").isString().withMessage("Description is not string").optional(),
			body("url_image").notEmpty().withMessage("URL image is empty").isString().withMessage("URL image is not string"),
			body("ingredients").notEmpty().withMessage("Ingredients is empty").isString().withMessage("Ingredients is not string"),
			body("instructions").notEmpty().withMessage("Instructions is empty").isString().withMessage("Instructions is not string"),
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			body("category_id").notEmpty().withMessage("Category ID is empty").isNumeric().withMessage("Category ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeController.createRecipe
		);

		// router.delete(
		// 	"/recipes/:recipeId",
		// 	param("recipeId").isNumeric().withMessage("ID is not numeric"),
		// 	HandlerValidationErrors.executeValidation,
		// 	HandlerAuth.authenticate,
		// 	RecipeController.deleteRecipeById
		// );

		return router;
	};
}
