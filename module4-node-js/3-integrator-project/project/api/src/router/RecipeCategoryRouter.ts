import { Router as routerExpress } from "express";
import { body } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import HandlerAuth from "./middlwares/HandlerAuth";
import RecipeCategoryController from "../controller/RecipeCategoryController";

export default class RecipeCategoryRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		/**
		 * @swagger
		 * tags:
		 *   name: Recipe Category
		 *   description: Categorías de recetas
		 */

		/**
		 * @swagger
		 * /api/recipes/categories:
		 *   get:
		 *     summary: Obtener categorías de recetas
		 *     description: Obtener todas las categorías de recetas.
		 *     tags:
		 *       - Recipe Category
		 *     responses:
		 *       200:
		 *         description: Lista de categorías de recetas
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.get("/recipes/categories", RecipeCategoryController.getRecipesCategories);

		/**
		 * @swagger
		 * /api/recipes/categories:
		 *   post:
		 *     summary: Crear nueva categoría de receta
		 *     description: Crear una nueva categoría de receta con la información proporcionada.
		 *     tags:
		 *       - Recipe Category
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               category:
		 *                 type: string
		 *                 description: Nombre de la categoría
		 *               title:
		 *                 type: string
		 *                 description: Título de la categoría
		 *               url_image:
		 *                 type: string
		 *                 description: URL de la imagen de la categoría
		 *     responses:
		 *       201:
		 *         description: Categoría de receta creada exitosamente
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       500:
		 *         description: Error interno del servidor
		 */
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
