import { Response } from "express";
import CustomException from "../model/CustomException";
import { StatusCodes } from "http-status-codes";
import Utils from "./Utils";

export default class ControllerUtils {
	static ok = (res: Response, dataResponse: any) => {
		res.status(StatusCodes.OK).json(Utils.convertFromCamelToSnake(dataResponse));
	};

	static created = (res: Response, dataResponse: any) => {
		res.status(StatusCodes.CREATED).json(Utils.convertFromCamelToSnake(dataResponse));
	};

	static badRequest = (res: Response, dataResponse: any) => {
		res.status(StatusCodes.BAD_REQUEST).json(Utils.convertFromCamelToSnake(dataResponse));
	};

	static unauthorized = (res: Response, dataResponse: any) => {
		res.status(StatusCodes.UNAUTHORIZED).json(Utils.convertFromCamelToSnake(dataResponse));
	};

	static notFound = (res: Response, dataResponse: any) => {
		res.status(StatusCodes.NOT_FOUND).json(Utils.convertFromCamelToSnake(dataResponse));
	};

	static exception = (res: Response, error: any) => {
		if (error instanceof CustomException) {
			res.status(error.statusCode).json(Utils.convertFromCamelToSnake(error));
			return;
		}
		const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
		res.status(statusCode).json(Utils.convertFromCamelToSnake(new CustomException(error.message, statusCode)));
	};
}
