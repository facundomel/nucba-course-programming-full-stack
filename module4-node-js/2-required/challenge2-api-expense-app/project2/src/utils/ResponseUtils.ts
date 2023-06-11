import humps from "humps";

export default class ResponseUtils {
	static convertFromSnakeToCamel = (data: any): any => {
		return humps.camelizeKeys(data);
	};

	static convertFromCamelToSnake = (data: any): any => {
		return humps.decamelizeKeys(data);
	};
}
