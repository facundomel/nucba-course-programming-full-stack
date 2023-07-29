import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import HandlerAuth from "./middlwares/HandlerAuth";
import RecipeFavoriteController from "../controller/RecipeFavoriteController";

export default class RecipeFavoriteRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get(
			"/recipes/favorite/:userId",
			param("userId").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.getRecipesFavoriteByUserId
		);

		router.get(
			"/recipes/favorite/:recipeId/:userId",
			param("recipeId").isNumeric().withMessage("Recipe ID is not numeric"),
			param("userId").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.getRecipeFavoriteByUserIdAndRecipeId
		);

		router.post(
			"/recipes/favorite",
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			body("recipe_id").notEmpty().withMessage("Recipe ID is empty").isNumeric().withMessage("Recipe ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.createRecipeFavorite
		);

		return router;
	};
}
