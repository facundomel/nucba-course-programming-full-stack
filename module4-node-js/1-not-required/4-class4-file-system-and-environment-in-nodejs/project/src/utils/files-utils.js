import fs from "fs";

export const readFile = (file) => {
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

export const writeFile = (file, content) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, JSON.stringify(content), (err) => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};
