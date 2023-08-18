import { Router as routerExpress } from "express";
import ResponseUtils from "../utils/ResponseUtils";
import { StatusCodes } from "http-status-codes";

export default class PingRouter {
	static init = (): routerExpress => {
		const router = routerExpress();

		/**
		 * @swagger
		 * tags:
		 *   name: Ping
		 *   description: Ping
		 */

		/**
		 * @swagger
		 * /api/ping:
		 *   get:
		 *     summary: Ping
		 *     description: Sirve para verificar que la API esté disponible y operativa.
		 *     tags:
		 *       - Ping
		 *     responses:
		 *       200:
		 *         description: Respuesta exitosa
		 *       500:
		 *         description: Error interno del servidor
		 */
		router.get("/ping", (req, res) => {
			ResponseUtils.ok(res, { message: "pong", statusCode: StatusCodes.OK });
		});

		return router;
	};
}
