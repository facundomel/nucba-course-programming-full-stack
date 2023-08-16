import humps from "humps";

export default class Utils {
	static convertFromSnakeToCamel = (data: any): any => {
		return humps.camelizeKeys(data);
	};

	static convertFromCamelToSnake = (data: any): any => {
		return humps.decamelizeKeys(data);
	};
}
