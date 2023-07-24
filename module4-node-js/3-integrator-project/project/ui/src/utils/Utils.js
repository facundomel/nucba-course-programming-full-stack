import humps from "humps";

export default class Utils {
	getHeadersDefault() {
		return { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" };
	}

	convertFromSnakeToCamel(data) {
		return humps.camelizeKeys(data);
	}

	convertFromCamelToSnake(data) {
		return humps.decamelizeKeys(data);
	}
}
