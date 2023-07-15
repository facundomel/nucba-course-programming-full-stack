import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import CustomException from "../../model/CustomException";
import ResponseUtils from "../../utils/ResponseUtils";

export default class HandlerValidationErrors {
	static executeValidation = (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			next();
			return;
		}
		res
			.status(StatusCodes.BAD_REQUEST)
			.json(
				ResponseUtils.convertFromCamelToSnake(new CustomException(JSON.stringify({ errors: errors.array() }), StatusCodes.BAD_REQUEST))
			);
	};
}
