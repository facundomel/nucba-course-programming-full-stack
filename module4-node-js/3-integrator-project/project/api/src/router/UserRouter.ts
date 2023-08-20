import { Router as routerExpress } from "express";
import { body, query } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import UserController from "../controller/UserController";

export default class UserRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		/**
		 * @swagger
		 * tags:
		 *   name: User
		 *   description: Usuarios
		 */

		/**
		 * @swagger
		 * /api/users/search:
		 *   get:
		 *     summary: Search de usuarios
		 *     description: Permite obtener usuarios. 
		 *       Si se proporciona un user_id o un email, devuelve un solo usuario. 
		 *       De lo contrario, devuelve todos los usuarios.
		 *     tags:
		 *       - User
		 *     parameters:
		 *       - in: query
		 *         name: id
		 *         required: false
		 *         description: ID del usuario a buscar.
		 *         example: 1
		 *         schema:
		 *           type: integer
		 *       - in: query
		 *         name: email
		 *         required: false
		 *         description: Correo electrónico del usuario a buscar.
		 *         example: user@hotmail.com
		 *         schema:
		 *           type: string
		 *     responses:
		 *       200:
		 *         description: Usuario obtenido exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               id: <ID del usuario>
		 *               first_name: "<Nombre>"
		 *               last_name: "<Apellido>"
		 *               email: "<Email>"
		 *               created_date: "<Fecha de creación>"
		 *               updated_date: "<Fecha de actualización>"
		 *               deleted_date: "<Fecha de eliminación>"
		 *               role_id: <ID del rol del usuario>
		 *       400:
		 *         description: Solicitud incorrecta (no se puede consultar por ambos campos a la vez o algún campo del body es del tipo de dato incorrecto).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 400
		 *       404:
		 *         description: Usuario no encontrado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "User not found"
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
		 *     summary: Registro de nuevo usuario
		 *     description: Registra un nuevo usuario con la información proporcionada.
		 *     tags:
		 *       - User
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
		 *         description: Usuario registrado exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               id: <ID del usuario>
		 *               first_name: "<Nombre>"
		 *               last_name: "<Apellido>"
		 *               email: "<Email>"
		 *               password: <Contraseña ofuscada>
		 *               created_date: "<Fecha de creación>"
		 *               updated_date: "<Fecha de actualización>"
		 *               deleted_date: "<Fecha de eliminación>"
		 *               role_id: <ID del rol del usuario>
		 *       400:
		 *         description: Solicitud incorrecta (algún campo del body no existe o es del tipo de dato incorrecto).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 400
		 *       409:
		 *         description: El usuario ya existe.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "User already exist"
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
		 *     summary: Actualización de contraseña del usuario
		 *     description: Actualiza la contraseña de un usuario existente.
		 *     tags:
		 *       - User
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
		 *         description: Contraseña actualizada exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               id: <ID del usuario>
		 *               first_name: "<Nombre>"
		 *               last_name: "<Apellido>"
		 *               email: "<Email>"
		 *               password: <Contraseña ofuscada>
		 *               created_date: "<Fecha de creación>"
		 *               updated_date: "<Fecha de actualización>"
		 *               deleted_date: "<Fecha de eliminación>"
		 *               role_id: <ID del rol del usuario>
		 *       400:
		 *         description: Solicitud incorrecta (algún campo del body no existe o es del tipo de dato incorrecto).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 400
		 *       404:
		 *         description: Usuario no enontrado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "User not found"
		 *               status_code: 404
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
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
