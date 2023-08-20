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
		 *     parameters:
		 *       - in: query
		 *         name: offset
		 *         description: Número de registro desde el que desea obtener datos (para paginación).
		 *         example: 0
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: limit
		 *         description: Número máximo de registros que desea obtener (para paginación).
		 *         example: 10
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Lista de recetas obtenida existosamete.
		 *         content:
		 *           application/json:
		 *             example:
		 *               recipes:
		 *                 - id: <ID de la receta>
		 *                   title: "<Título>"
		 *                   description: "<Descripción>"
		 *                   url_image: "<URL de la imagen>"
		 *                   ingredients: "<Ingredientes>"
		 *                   instructions: "<Instrucciones>"
		 *                   created_date: "<Fecha de creación>"
		 *                   updated_date: "<Fecha de actualización>"
		 *                   deleted_date: "<Fecha de eliminación>"
		 *                   user_id: <ID del usuario que creó la receta>
		 *                   category_id: <ID de la categoría de la receta>
		 *                   recipe_category:
		 *                     id: <ID de la categoría>
		 *                     category: "<Categoría>"
		 *                     title: "<Título>"
		 *                     url_image: "<URL de la imagen>"
		 *                   user:
		 *                     id: <ID del usuario>
		 *                     first_name: "<Nombre>"
		 *                     last_name: "<Apellido>"
		 *                     email: "<Email>"
		 *               paging:
		 *                 offset: <Offset>
		 *                 limit: <Limit>
		 *                 total: <Total de recetas>
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
		 */
		router.get("/recipes", RecipeController.getRecipes);

		/**
		 * @swagger
		 * /api/recipes/{recipeId}:
		 *   get:
		 *     summary: Obtener receta por ID
		 *     description: Obtener una receta por ID. Para autorizar la solicitud haga clic en el candado y proporcione el access_token.
		 *     tags:
		 *       - Recipe
		 *     parameters:
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta a obtener.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta obtenida exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               recipes:
		 *                 id: <ID de la receta>
		 *                 title: "<Título>"
		 *                 description: "<Descripción>"
		 *                 url_image: "<URL de la imagen>"
		 *                 ingredients: "<Ingredientes>"
		 *                 instructions: "<Instrucciones>"
		 *                 created_date: "<Fecha de creación>"
		 *                 updated_date: "<Fecha de actualización>"
		 *                 deleted_date: "<Fecha de eliminación>"
		 *                 user_id: <ID del usuario que creó la receta>
		 *                 category_id: <ID de la categoría de la receta>
		 *                 recipe_category:
		 *                   id: <ID de la categoría>
		 *                   category: "<Categoría>"
		 *                   title: "<Título>"
		 *                   url_image: "<URL de la imagen>"
		 *                 user:
		 *                   id: <ID del usuario>
		 *                   first_name: "<Nombre>"
		 *                   last_name: "<Apellido>"
		 *                   email: "<Email>"
		 *       400:
		 *         description: Solicitud incorrecta (el ID del usuario no es numérico).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "{\"errors\":[{\"type\":\"field\",\"value\":\"a\",\"msg\":\"ID is not numeric\",\"path\":\"recipeId\",\"location\":\"params\"}]}"
		 *               status_code: 400
		 *       401:
		 *         description: Usuario no autenticado (el access token no está presente, expiró o no es válido).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 401
		 *       404:
		 *         description: Receta no encontrada.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "Recipe not found"
		 *               status_code: 404
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
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
		 *     description: Crear una nueva receta con la información proporcionada. Para autorizar la solicitud haga clic en el candado y proporcione el access_token.
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
		 *                 description: ID del usuario que creará la receta
		 *               category_id:
		 *                 type: integer
		 *                 description: ID de la categoría de la receta que se creará
		 *     responses:
		 *       201:
		 *         description: Receta creada exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               id: <ID de la receta>
		 *               title: "<Título>"
		 *               description: "<Descripción>"
		 *               url_image: "<URL de la imagen>"
		 *               ingredients: "<Ingredientes>"
		 *               instructions: "<Instrucciones>"
		 *               created_date: "<Fecha de creación>"
		 *               updated_date: "<Fecha de actualización>"
		 *               deleted_date: "<Fecha de eliminación>"
		 *               user_id: <ID del usuario que creó la receta>
		 *               category_id: "<ID de la categoría de la receta>"
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
		 *         description: Usuario no autorizado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "User not authorized"
		 *               status_code: 403
		 *       404:
		 *         description: Usuario o categoría de receta no encontrada.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 404
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
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
