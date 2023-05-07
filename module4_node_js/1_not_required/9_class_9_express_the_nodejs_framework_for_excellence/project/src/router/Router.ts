import { Router as routerExpress } from "express";
import ProductController from "../controller/ProductController";

export default class Router {
	static init = (): routerExpress => {
		const router = routerExpress();

		router.get("/products", ProductController.getProducts);
		router.get("/product/:id", ProductController.getProductById);
		router.post("/product", ProductController.saveProduct);
		
		return router;
	};
}
