import humps from "humps";
import CustomException from "../model/CustomException";
import { StatusCodes } from "http-status-codes";
import { Response } from "express";

export default class ResponseUtils {
	static convertFromSnakeToCamel = (data: any): any => {
		return humps.camelizeKeys(data);
	};

	static convertFromCamelToSnake = (data: any): any => {
		return humps.decamelizeKeys(data);
	};

	static getException = (res: Response, error: any) => {
		if (error instanceof CustomException) {
			res.status(error.statusCode).json(ResponseUtils.convertFromCamelToSnake(error));
			return;
		}
		const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
		res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new CustomException(error.message, statusCode)));
	};
}
