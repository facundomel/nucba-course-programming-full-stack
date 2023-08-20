import { Router as routerExpress } from "express";
import { body, param } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import HandlerAuth from "./middlwares/HandlerAuth";
import RecipeFavoriteController from "../controller/RecipeFavoriteController";

export default class RecipeFavoriteRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		/**
		 * @swagger
		 * tags:
		 *   name: Recipe Favorite
		 *   description: Recetas favoritas
		 */

		/**
		 * @swagger
		 * /api/recipes/favorite/{userId}:
		 *   get:
		 *     summary: Obtener recetas favoritas por ID de usuario
		 *     description: Obtener una lista de recetas favoritas para un ID de usuario dado.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: header
		 *         name: Authorization
		 *         required: true
		 *         description: Token de acceso válido. Deberá reemplazar "<Access_Token>" con su access_token real.
		 *         example: Bearer <Access_Token>
		 *         schema:
		 *           type: string
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario del que se quiere obtener las recetas favoritas.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Lista de recetas favoritas obtenida exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               - id: <ID de la receta favorita>
		 *                 created_date: <Fecha de creación>
		 *                 updated_date: <Fecha de actualización>
		 *                 deleted_date: <Fecha de eliminación>
		 *                 user_id: <ID del usuario que asignó la receta a favoritos>
		 *                 recipe_id: <ID de la receta asignada a favoritos>
		 *       400:
		 *         description: Solicitud incorrecta (el ID del usuario no es numérico).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "{\"errors\":[{\"type\":\"field\",\"value\":\"a\",\"msg\":\"User ID is not numeric\",\"path\":\"userId\",\"location\":\"params\"}]}"
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
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
		 */
		router.get(
			"/recipes/favorite/:userId",
			param("userId").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.getRecipesFavoriteByUserId
		);

		/**
		 * @swagger
		 * /api/recipes/favorite/{recipeId}/{userId}:
		 *   get:
		 *     summary: Obtener receta favorita por ID de receta y usuario
		 *     description: Obtener una receta favorita para un ID de receta y usuario dados.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: header
		 *         name: Authorization
		 *         required: true
		 *         description: Token de acceso válido. Deberá reemplazar "<Access_Token>" con su access_token real.
		 *         example: Bearer <Access_Token>
		 *         schema:
		 *           type: string
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta que fue asignada a favoritos.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario que asignó la receta a favoritos.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta favorita obtenida exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               id: <ID de la receta favorita>
		 *               created_date: <Fecha de creación>
		 *               updated_date: <Fecha de actualización>
		 *               deleted_date: <Fecha de eliminación>
		 *               user_id: <ID del usuario que asignó la receta a favoritos>
		 *               recipe_id: <ID de la receta asignada a favoritos>
		 *       400:
		 *         description: Solicitud incorrecta (el ID de la receta o del usuario no es numérico).
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
		 *         description: Receta favorita por user_id y recipe_id no encontrada.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "Recipe favorite by user_id and recipe_id not found"
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
			"/recipes/favorite/:recipeId/:userId",
			param("recipeId").isNumeric().withMessage("Recipe ID is not numeric"),
			param("userId").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.getRecipeFavoriteByUserIdAndRecipeId
		);

		/**
		 * @swagger
		 * /api/recipes/favorite/{userId}/details:
		 *   get:
		 *     summary: Obtener recetas favoritas con detalles por ID de usuario
		 *     description: Obtener una lista de recetas favoritas con detalles para un ID de usuario dado.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: header
		 *         name: Authorization
		 *         required: true
		 *         description: Token de acceso válido. Deberá reemplazar "<Access_Token>" con su access_token real.
		 *         example: Bearer <Access_Token>
		 *         schema:
		 *           type: string
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario del que se quiere obtener las recetas favoritas con detalles.
		 *         example: 1
		 *         schema:
		 *           type: integer
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
		 *         description: Lista de recetas favoritas con detalles obtenida exitosamente.
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
		 *                   user_id: <ID del usuario que asignó la receta a favoritos>
		 *                   category_id: <ID de la categoría de la receta asignada a favoritos>
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
		 *                 total: <Total de recetas favoritas>
		 *       400:
		 *         description: Solicitud incorrecta (el ID del usuario no es numérico).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "{\"errors\":[{\"type\":\"field\",\"value\":\"a\",\"msg\":\"User ID is not numeric\",\"path\":\"userId\",\"location\":\"params\"}]}"
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
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
		 */
		router.get(
			"/recipes/favorite/:userId/details",
			param("userId").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.getRecipesFavoriteWithDetailsByUserId
		);

		/**
		 * @swagger
		 * /api/recipes/favorite/{recipeId}/{userId}/details:
		 *   get:
		 *     summary: Obtener receta favorita con detalles por ID de receta y usuario
		 *     description: Obtener una receta favorita con detalles para un ID de receta y usuario dados.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: header
		 *         name: Authorization
		 *         required: true
		 *         description: Token de acceso válido. Deberá reemplazar "<Access_Token>" con su access_token real.
		 *         example: Bearer <Access_Token>
		 *         schema:
		 *           type: string
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta que fue asignada a favoritos.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario que asignó la receta a favoritos.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta favorita con detalles obtenida exitosamente.
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
		 *               user_id: <ID del Usuario que asignó la receta a favoritos>
		 *               category_id: <ID de la categoría de la receta asignada a favoritos>
		 *               recipe_category:
		 *                 id: <ID de la categoría>
		 *                 category: "<Categoría>"
		 *                 title: "<Título>"
		 *                 url_image: "<URL de la imagen>"
		 *               user:
		 *                 id: <ID del usuario>
		 *                 first_name: "<Nombre>"
		 *                 last_name: "<Apellido>"
		 *                 email: "<Email>"
		 *       400:
		 *         description: Solicitud incorrecta (el ID de la receta favorita o del usuario no es numérico).
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
		 *         description: Receta favorita por user_id y recipe_id no encontrada.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "Recipe favorite by user_id and recipe_id not found"
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
			"/recipes/favorite/:recipeId/:userId/details",
			param("recipeId").isNumeric().withMessage("Recipe ID is not numeric"),
			param("userId").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.getRecipeFavoriteWithDetailsByUserIdAndRecipeId
		);

		/**
		 * @swagger
		 * /api/recipes/favorite:
		 *   post:
		 *     summary: Crear un receta favorita
		 *     description: Crear una nueva receta favorita.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: header
		 *         name: Authorization
		 *         required: true
		 *         description: Token de acceso válido. Deberá reemplazar "<Access_Token>" con su access_token real.
		 *         example: Bearer <Access_Token>
		 *         schema:
		 *           type: string
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               user_id:
		 *                 type: integer
		 *                 description: ID del usuario que asignará una receta a favoritos.
		 *               recipe_id:
		 *                 type: integer
		 *                 description: ID de la receta que se asignará a favoritos.
		 *     responses:
		 *       201:
		 *         description: Receta favorita creada exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               id: <ID de la receta favorita>
		 *               created_date: <Fecha de creación>
		 *               updated_date: <Fecha de actualización>
		 *               deleted_date: <Fecha de eliminación>
		 *               user_id: <ID del usuario que asignó la receta a favoritos>
		 *               recipe_id: <ID de la receta que se asignó a favoritos>
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
		 *         description: Usuario o receta no encontrada.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 404
		 *       409:
		 *         description: La receta favorita ya existe para el usuario.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "Recipe favorite already exist for the user"
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
			"/recipes/favorite",
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			body("recipe_id").notEmpty().withMessage("Recipe ID is empty").isNumeric().withMessage("Recipe ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.createRecipeFavorite
		);

		/**
		 * @swagger
		 * /api/recipes/favorite/{recipeId}/{userId}:
		 *   delete:
		 *     summary: Eliminar receta favorita por ID de receta y usuario
		 *     description: Eliminar una receta favorita por ID de receta y usuario dados.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: header
		 *         name: Authorization
		 *         required: true
		 *         description: Token de acceso válido. Deberá reemplazar "<Access_Token>" con su access_token real.
		 *         example: Bearer <Access_Token>
		 *         schema:
		 *           type: string
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta que fue asignada a favoritos.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario del que asignó la receta a favoritos.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta favorita eliminada exitosamente.
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
		 *               user_id: <ID del usuario que asignó la receta a favoritos>
		 *               category_id: <ID de la categoría de la receta asignada a favoritos>
		 *               recipe_category:
		 *                 id: <ID de la categoría>
		 *                 category: "<Categoría>"
		 *                 title: "<Título>"
		 *                 url_image: "<URL de la imagen>"
		 *               user:
		 *                 id: <ID del usuario>
		 *                 first_name: "<Nombre>"
		 *                 last_name: "<Apellido>"
		 *                 email: "<Email>"
		 *       400:
		 *         description: Solicitud incorrecta (el ID de la receta o del usuario no es numérico).
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
		 *         description: Receta favorita por user_id y recipe_id no encontrada.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "Recipe favorite by user_id and recipe_id not found"
		 *               status_code: 404
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
		 */
		router.delete(
			"/recipes/favorite/:recipeId/:userId",
			param("recipeId").isNumeric().withMessage("Recipe ID is not numeric"),
			param("userId").isNumeric().withMessage("User ID is not numeric"),
			HandlerValidationErrors.executeValidation,
			HandlerAuth.authenticate,
			HandlerAuth.authorizeAdminOrUserRole,
			RecipeFavoriteController.deleteRecipeFavoriteByUserIdAndRecipeId
		);

		return router;
	};
}
