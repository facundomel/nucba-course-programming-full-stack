import { StatusCodes } from "http-status-codes";
import Exception from "../model/Exception";
import Product from "../model/Product";
import FilesUtils from "../utils/FilesUtils";
import ResponseUtils from "../utils/ResponseUtils";

export default class ProductService {
	static getProducts = async (): Promise<Product[]> => {
		try {
			const products: Product[] = (await FilesUtils.readFileDB()) as Product[];
			return ResponseUtils.convertFromCamelToSnake(products);
		} catch (error: any) {
			throw error;
		}
	};

	static getProductById = async (productId: number): Promise<Product> => {
		try {
			const products: Product[] = (await FilesUtils.readFileDB()) as Product[];
			const product: Product = products.find((product) => product.id == productId) as Product;

			if (product == null) throw new Exception("Not Found", StatusCodes.NOT_FOUND);

			return ResponseUtils.convertFromCamelToSnake(product);
		} catch (error: any) {
			throw error;
		}
	};

	static saveProduct = async (product: Product): Promise<Product> => {
		try {
			const products: Product[] = (await FilesUtils.readFileDB()) as Product[];
			const existProduct = products.some((prod) => prod.name === product.name);

			if (existProduct) throw new Exception("Product already exist", StatusCodes.CONFLICT);

			product.id = new Date().getTime();
			products.push(product);
			await FilesUtils.writeFileDB(products);
			return ResponseUtils.convertFromCamelToSnake(product);
		} catch (error: any) {
			throw error;
		}
	};
}
