import { Router as routerExpress } from "express";
import { body, query } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import UserController from "../controller/UserController";

export default class UsersRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		/**
		 * @swagger
		 * tags:
		 *   name: Users
		 *   description: Administración de usuarios
		 */

		/**
		 * @swagger
		 * /api/users/search:
		 *   get:
		 *     summary: Search de usuarios
		 *     description: Recuperar usuarios en función de los parámetros de query string.
		 *       Si se proporciona una identificación o un correo electrónico, devuelve un solo usuario.
		 *       De lo contrario, devuelve una lista de todos los usuarios.
		 *     tags:
		 *       - Users
		 *     parameters:
		 *       - in: query
		 *         name: id
		 *         required: false
		 *         description: ID del usuario a buscar
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: email
		 *         required: false
		 *         description: Correo electrónico del usuario a buscar
		 *         schema:
		 *           type: string
		 *     responses:
		 *       200:
		 *         description: Respuesta exitosa
		 *       400:
		 *         description: Solicitud incorrecta
		 *       404:
		 *         description: Usuario no encontrado
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.get(
			"/users/search",
			query("id").optional().isNumeric().withMessage("User ID is not numeric"),
			query("email").optional().isString().withMessage("Email is not string"),
			HandlerValidationErrors.executeValidation,
			UserController.getUserSearch
		);

		/**
		 * @swagger
		 * /api/users:
		 *   post:
		 *     summary: Registro de usuario
		 *     description: Registra un nuevo usuario con la información proporcionada.
		 *     tags:
		 *       - Users
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               first_name:
		 *                 type: string
		 *                 description: Nombre del usuario
		 *               last_name:
		 *                 type: string
		 *                 description: Apellido del usuario
		 *               email:
		 *                 type: string
		 *                 description: Correo electrónico del usuario
		 *               password:
		 *                 type: string
		 *                 description: Contraseña del usuario (debe ser una contraseña segura)
		 *     responses:
		 *       201:
		 *         description: Usuario registrado exitosamente
		 *       400:
		 *         description: Solicitud incorrecta
		 *       409:
		 *         description: El usuario ya existe
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.post(
			"/users",
			body("first_name").notEmpty().withMessage("First name is empty").isString().withMessage("First name is not string"),
			body("last_name").notEmpty().withMessage("Last name is empty").isString().withMessage("Last name is not string"),
			body("email").notEmpty().withMessage("Email is empty").isEmail().withMessage("Email is not valid"),
			body("password").notEmpty().withMessage("Password is empty").isStrongPassword().withMessage("Password is not strong"),
			HandlerValidationErrors.executeValidation,
			UserController.registerUser
		);

		/**
		 * @swagger
		 * /api/users/password:
		 *   put:
		 *     summary: Actualización de contraseña de usuario
		 *     description: Actualiza la contraseña de un usuario existente.
		 *     tags:
		 *       - Users
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               user_id:
		 *                 type: integer
		 *                 description: ID del usuario cuya contraseña se actualizará
		 *               new_password:
		 *                 type: string
		 *                 description: Nueva contraseña del usuario (debe ser una contraseña segura)
		 *     responses:
		 *       200:
		 *         description: Contraseña actualizada exitosamente
		 *       400:
		 *         description: Solicitud incorrecta
		 *       404:
		 *         description: Usuario no enontrado
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.put(
			"/users/password",
			body("user_id").notEmpty().withMessage("User ID is empty").isNumeric().withMessage("User ID is not numeric"),
			body("new_password").notEmpty().withMessage("Password is empty").isStrongPassword().withMessage("New password is not strong"),
			HandlerValidationErrors.executeValidation,
			UserController.updateUserPassword
		);

		return router;
	};
}
