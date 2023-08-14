import humps from "humps";

export default class Utils {
	static convertFromSnakeToCamel(data) {
		return humps.camelizeKeys(data);
	}

	static convertFromCamelToSnake(data) {
		return humps.decamelizeKeys(data);
	}
}
