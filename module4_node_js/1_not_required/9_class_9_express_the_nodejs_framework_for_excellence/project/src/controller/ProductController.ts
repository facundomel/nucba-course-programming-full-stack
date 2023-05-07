import { Request, Response } from "express";
import ProductService from "../service/ProductService";
import { StatusCodes } from "http-status-codes";
import Product from "../model/Product";
import Exception from "../model/Exception";
import ResponseUtils from "../utils/ResponseUtils";

export default class ProductController {
	static getProducts = async (req: Request, res: Response): Promise<void> => {
		try {
			const products: Product[] = await ProductService.getProducts();
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(products));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};

	static getProductById = async (req: Request, res: Response): Promise<void> => {
		try {
			const product: Product = await ProductService.getProductById(Number(req.params.id));
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(product));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};

	static saveProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.body.name || !req.body.description) {
				res.status(StatusCodes.BAD_REQUEST).json(new Exception("Bad Request", StatusCodes.BAD_REQUEST));
				return;
			}

			const product: Product = await ProductService.saveProduct(req.body as Product);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(product));
		} catch (error: any) {
			const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new Exception(error.message, statusCode)));
		}
	};
}
