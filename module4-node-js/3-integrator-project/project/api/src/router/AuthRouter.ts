import { Router as routerExpress } from "express";
import { body } from "express-validator";
import HandlerValidationErrors from "./middlwares/HandlerValidationErrors";
import AuthController from "../controller/AuthController";

export default class AuthRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		/**
		 * @swagger
		 * tags:
		 *   name: Authentication
		 *   description: Autenticación de usuarios
		 */

		/**
		 * @swagger
		 * /api/login:
		 *   post:
		 *     summary: Iniciar sesión
		 *     description: Iniciar sesión con un correo electrónico y una contraseña válidos.
		 *     tags:
		 *       - Authentication
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               email:
		 *                 type: string
		 *                 description: Correo electrónico del usuario
		 *               password:
		 *                 type: string
		 *                 description: Contraseña del usuario
		 *     responses:
		 *       200:
		 *         description: Inicio de sesión exitoso.
		 *         content:
		 *           application/json:
		 *             example:
		 *               access_token: "<Access token>"
		 *               refresh_token: "<Refresh token>"
		 *       400:
		 *         description: Solicitud incorrecta (algún campo del body es vacío o del tipo de dato incorrecto, o bien el pasword es inválido).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 400
		 *       404:
		 *         description: Usuario o rol de usuario no encontrado.
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
			"/login",
			body("email").notEmpty().withMessage("Email is empty").isEmail().withMessage("Email is not valid"),
			body("password").notEmpty().withMessage("Password is empty").isString().withMessage("Password is not string"),
			HandlerValidationErrors.executeValidation,
			AuthController.login
		);

		/**
		 * @swagger
		 * /api/refresh-token:
		 *   post:
		 *     summary: Actualizar token de acceso
		 *     description: Actualiza el token de acceso utilizando un token de actualización válido. Para autorizar la solicitud haga clic en el candado y proporcione el refresh_token.
		 *     tags:
		 *       - Authentication
		 *     responses:
		 *       200:
		 *         description: Token de acceso actualizado exitosamente.
		 *         content:
		 *           application/json:
		 *             example:
		 *               access_token: "<Nuevo access token>"
		 *               refresh_token: "<Nuevo refresh token>"
		 *       401:
		 *         description: El usuario no está autenticado (el refresh token no está presente, expiró o no es válido).
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 401
		 *       404:
		 *         description: Usuario o rol de usuario no encontrado.
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
		router.post("/refresh-token", AuthController.refreshToken);

		return router;
	};
}
