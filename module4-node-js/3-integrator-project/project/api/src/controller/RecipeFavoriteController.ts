import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../utils/ResponseUtils";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import RecipeFavoriteService from "../service/RecipeFavoriteService";

export default class RecipeFavoriteController {
	static getRecipesFavoriteByUserId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipesFavorite: RecipeFavorite[] = (await RecipeFavoriteService.getRecipesFavoriteByUserId(
				Number(req.params.userId)
			)) as RecipeFavorite[];
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipesFavorite));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static getRecipeFavoriteByUserIdAndRecipeId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavorite: RecipeFavorite = await RecipeFavoriteService.getRecipeFavoriteByUserIdAndRecipeId(
				Number(req.params.userId),
				Number(req.params.recipeId)
			) as RecipeFavorite;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipeFavorite));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static createRecipeFavorite = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavorite: RecipeFavorite = await RecipeFavoriteService.createRecipeFavorite(
				ResponseUtils.convertFromSnakeToCamel(req.body) as RecipeFavorite
			);
			res.status(StatusCodes.CREATED).json(ResponseUtils.convertFromCamelToSnake(recipeFavorite));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};
}
