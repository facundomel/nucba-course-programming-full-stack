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
		 *     description: Sirve para verificar que la API está disponible y operativa.
		 *     tags:
		 *       - Ping
		 *     responses:
		 *       200:
		 *         description: La API se encuentra disponible y operativa.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "pong"
		 *               status_code: 200
		 *       500:
		 *         description: Error interno del servidor no controlado.
		 *         content:
		 *           application/json:
		 *             example:
		 *               message: "<Depende del escenario>"
		 *               status_code: 500
		 */
		router.get("/ping", (req, res) => {
			ResponseUtils.ok(res, { message: "pong", statusCode: StatusCodes.OK });
		});

		return router;
	};
}
