import path from "path";
import fs from "fs";
import Product from "../model/Product";

export default class FilesUtils {
	private static readonly filePathDB = "../data/products.json";

	static readFileDB = async () => {
		return this.readFile(path.resolve(__dirname, this.filePathDB));
	};

	static writeFileDB = async (products: Product[]) => {
		return this.writeFile(path.resolve(__dirname, this.filePathDB), products);
	};

	private static readFile = (filePath: string): Promise<object> => {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, "utf8", (err, content) => {
				try {
					if (err) {
						return reject(err);
					}
					return resolve(JSON.parse(content));
				} catch (error: any) {
					return reject(error.message);
				}
			});
		});
	};

	private static writeFile = (filePath: string, content: any): Promise<string> => {
		return new Promise((resolve, reject) => {
			fs.writeFile(filePath, JSON.stringify(content), (err) => {
				if (err) {
					reject(err);
				}
				resolve("Satisfactory writing");
			});
		});
	};
}
