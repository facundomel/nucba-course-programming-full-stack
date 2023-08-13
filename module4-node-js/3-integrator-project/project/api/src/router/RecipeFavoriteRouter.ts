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
		 * /api/recipes/favorite/{userId}/details:
		 *   get:
		 *     summary: Obtener recetas favoritas con detalles por ID de usuario
		 *     description: Obtener una lista de recetas favoritas con detalles para un ID de usuario dado.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario para el cual se obtienen las recetas favoritas
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Lista de recetas favoritas con detalles
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       500:
		 *         description: Error interno del servidor
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
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta favorita a obtener
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario dueño de la receta favorita
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta favorita con detalles
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       404:
		 *         description: Receta favorita por user_id y recipe_id no encontrada
		 *       500:
		 *         description: Error interno del servidor
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
		 * /api/recipes/favorite/{userId}:
		 *   get:
		 *     summary: Obtener recetas favoritas por ID de usuario
		 *     description: Obtener una lista de recetas favoritas para un ID de usuario dado.
		 *     tags:
		 *       - Recipe Favorite
		 *     parameters:
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario para el cual se obtienen las recetas favoritas
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Lista de recetas favoritas
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       500:
		 *         description: Error interno del servidor
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
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta favorita a obtener
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario dueño de la receta favorita
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta favorita
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       404:
		 *         description: Receta favorita por user_id y recipe_id no encontrada
		 *       500:
		 *         description: Error interno del servidor
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
		 * /api/recipes/favorite:
		 *   post:
		 *     summary: Crear receta favorita
		 *     description: Crear una nueva receta favorita con la información proporcionada.
		 *     tags:
		 *       - Recipe Favorite
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               user_id:
		 *                 type: integer
		 *                 description: ID del usuario dueño de la receta favorita
		 *               recipe_id:
		 *                 type: integer
		 *                 description: ID de la receta a marcar como favorita
		 *     responses:
		 *       201:
		 *         description: Receta favorita creada exitosamente
		 *       400:
		 *         description: Solicitud incorrecta
		 *       401:
		 *         description: No autorizado
		 *       404:
		 *         description: Usuario o receta no encontrada
		 *       409:
		 *         description: La receta favorita ya existe para el usuario
		 *       500:
		 *         description: Error interno del servidor
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
		 *       - in: path
		 *         name: recipeId
		 *         required: true
		 *         description: ID de la receta a eliminar de las favoritas
		 *         schema:
		 *           type: integer
		 *       - in: path
		 *         name: userId
		 *         required: true
		 *         description: ID del usuario dueño de la receta favorita
		 *         schema:
		 *           type: integer
		 *     responses:
		 *       200:
		 *         description: Receta favorita eliminada exitosamente
		 *       400:
		 *         description: Solicitud incorrecta
		 *       404:
		 *         description: Receta favorita por userId y recipeId no encontrada
		 *       401:
		 *         description: No autorizado
		 *       500:
		 *         description: Error interno del servidor
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
