import { Router as routerExpress } from "express";
import ProductController from "../controller/ProductController";
import { body } from "express-validator";
import HandlerValidationErrors from "./HandlerValidationErrors";

export default class Router {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get("/products", ProductController.getProducts);
		router.get("/product/:id", ProductController.getProductById);
		router.post(
			"/product",
			body("name").notEmpty().withMessage("Name is empty").isString().withMessage("Name is not string"),
			body("description").notEmpty().withMessage("Description is empty").isString().withMessage("Description is not string"),
			HandlerValidationErrors.saveProduct,
			ProductController.saveProduct
		);

		return router;
	};
}
