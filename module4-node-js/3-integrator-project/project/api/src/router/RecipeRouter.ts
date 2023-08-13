import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import HandlerAuth from "./middlwares/HandlerAuth";
import RecipeController from "../controller/RecipeController";

export default class RecipeRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		/**
		 * @swagger
		 * tags:
		 *   name: Recipe
		 *   description: Recetas
		 */

		/**
		 * @swagger
		 * /api/recipes:
		 *   get:
		 *     summary: Obtener todas las recetas
		 *     description: Obtener una lista de todas las recetas disponibles.
		 *     tags:
		 *       - Recipe
		 *     responses:
		 *       200:
		 *         description: Lista de recetas
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.get("/recipes", RecipeController.getRecipes);

		/**
		 * @swagger
		 * /api/recipes/{recipeId}:
		 *   get:
		 *     summary: Obtener receta por ID
		 *     description: Obtener una receta por su ID.
		 *     tags:
		 *       - Recipe
		 *     parameters:
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta a obtener
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       404:
		 *         description: Receta no encontrada
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.get(
			"/recipes/:recipeId",
			param("recipeId").isNumeric().withMessage("ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			RecipeController.getRecipeById
		);

		/**
		 * @swagger
		 * /api/recipes:
		 *   post:
		 *     summary: Crear una nueva receta
		 *     description: Crear una nueva receta con la información proporcionada.
		 *     tags:
		 *       - Recipe
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               title:
		 *                 type: string
		 *                 description: Título de la receta
		 *               description:
		 *                 type: string
		 *                 description: Descripción de la receta
		 *               url_image:
		 *                 type: string
		 *                 description: URL de la imagen de la receta
		 *               ingredients:
		 *                 type: string
		 *                 description: Ingredientes de la receta
		 *               instructions:
		 *                 type: string
		 *                 description: Instrucciones de la receta
		 *               user_id:
		 *                 type: integer
		 *                 description: ID del usuario creador de la receta
		 *               category_id:
		 *                 type: integer
		 *                 description: ID de la categoría de la receta
		 *     responses:
		 *       201:
		 *         description: Receta creada exitosamente
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       500:
		 *         description: Error interno del servidor
		 */
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

		return router;
	};
}
