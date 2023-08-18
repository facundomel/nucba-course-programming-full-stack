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
		 *         description: Inicio de sesión exitoso
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: Inicio de sesión exitoso
		 *               access_token: <Access Token>
		 *               refresh_token: <Refresh Token>
		 *       400:
		 *         description: Solicitud o password incorrecto
		 *       401:
		 *         description: Credenciales inválidas
		 *       404:
		 *         description: Usuario o role de usuario no encontrado
		 *       500:
		 *         description: Error interno del servidor
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
		 *     description: Actualiza el token de acceso utilizando un token de actualización válido.
		 *     tags:
		 *       - Authentication
		 *     responses:
		 *       200:
		 *         description: Token de acceso actualizado exitosamente
		 *         content:
		 *           application/json:
		 *             example:
		 *               access_token: <Nuevo Access Token>
		 *       401:
		 *         description: Refresh token no está presente
		 *       404:
		 *         description: Usuario o role de usuario no encontrado, expiró o no es válido
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.post("/refresh-token", AuthController.refreshToken);

		return router;
	};
}
