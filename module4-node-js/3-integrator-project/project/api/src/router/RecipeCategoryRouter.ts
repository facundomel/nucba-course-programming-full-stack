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
		 *         description: Lista de categorías de recetas obtenida exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               - id: <ID de la categoría creada>
		 *                 category: "<Categoría>"
		 *                 title: "<Título>"
		 *                 url_image: "<URL de la imagen>"
		 *                 created_date: "<Fecha de creación>"
		 *                 updated_date: "<Fecha de actualización>"
		 *                 deleted_date: "<Fecha de eliminación>"
		 *                 user_id: <ID del usuario que creó la categoría>
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
		 */
		router.get("/recipes/categories", RecipeCategoryController.getRecipesCategories);

		/**
		 * @swagger
		 * /api/recipes/categories:
		 *   post:
		 *     summary: Crear nueva categoría de receta
		 *     description: Crear una nueva categoría de receta con la información proporcionada. Para autorizar la solicitud haga clic en el candado y proporcione el access_token.
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
		 *               user_id:
		 *                 type: integer
		 *                 description: ID del usuario que creará la categoría
		 *     responses:
		 *       201:
		 *         description: Categoría de receta creada exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               id: <ID de la categoría>
		 *               category: "<Categoría>"
		 *               title: "<Título>"
		 *               url_image: "<URL de la imagen>"
		 *               created_date: "<Fecha de creación>"
		 *               updated_date: "<Fecha de actualización>"
		 *               deleted_date: "<Fecha de eliminación>"
		 *               user_id: <ID del usuario que creó la categoría>
		 *       400:
		 *         description: Solicitud incorrecta (algún campo del body es vacío o del tipo de dato incorrecto).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 400
		 *       401:
		 *         description: Usuario no autenticado (el access token no está presente, expiró o no es válido).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 401
		 *       403:
		 *         description: Usuario no autorizado (solo un administrador puede crear categorías).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "Not authorized: Need admin role"
		 *               status_code: 403
		 *       404:
		 *         description: El usuario que está creando la categoría no existe.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "User not found"
		 *               status_code: 404
		 *       409:
		 *         description: La categoría de receta que se está creando ya existe.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "Recipe category already exist"
		 *               status_code: 409
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
		 */
		router.post(
			"/recipes/categories",
			body("category").notEmpty().withMessage("Category is empty").isString().withMessage("Category is not string"),
			body("title").notEmpty().withMessage("Title is empty").isString().withMessage("Title is not string"),
			body("url_image").notEmpty().withMessage("URL image is empty").isString().withMessage("URL image is not string"),
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminRole,
			RecipeCategoryController.createRecipeCategory
		);

		return router;
	};
}
