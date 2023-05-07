import fs from "fs";

export default class FilesUtils {
	static readFile = (file) => {
		return new Promise((resolve, reject) => {
			fs.readFile(file, "utf8", (err, content) => {
				try {
					if (err) {
						return reject(err);
					}
					return resolve(JSON.parse(content));
				} catch (error) {
					return reject(error.message);
				}
			});
		});
	};

	static writeFile = (file, content) => {
		return new Promise((resolve, reject) => {
			fs.writeFile(file, JSON.stringify(content), (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	};
}
