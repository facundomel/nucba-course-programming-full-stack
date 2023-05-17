import path from "path";
import fs from "fs";

export default class FilesUtils {
	static readFile = (filePath: string): Promise<object> => {
		return new Promise((resolve, reject) => {
			fs.readFile(path.resolve(__dirname, filePath), "utf8", (err, content) => {
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

	static writeFile = (filePath: string, content: any): Promise<string> => {
		return new Promise((resolve, reject) => {
			fs.writeFile(path.resolve(__dirname, filePath), JSON.stringify(content), (err) => {
				if (err) {
					reject(err);
				}
				resolve("Satisfactory writing");
			});
		});
	};
}
