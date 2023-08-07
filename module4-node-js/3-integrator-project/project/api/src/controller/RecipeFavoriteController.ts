import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../utils/ResponseUtils";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import RecipeFavoriteService from "../service/RecipeFavoriteService";
import Recipe from "../model/entity/Recipe";

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
			const recipeFavorite: RecipeFavorite = (await RecipeFavoriteService.getRecipeFavoriteByUserIdAndRecipeId(
				Number(req.params.userId),
				Number(req.params.recipeId)
			)) as RecipeFavorite;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipeFavorite));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static getRecipesFavoriteWithDetailsByUserId = async (req: Request, res: Response): Promise<void> => {
		try {
			let offset: any = req.query.offset;
			let limit: any = req.query.limit;

			if (!isNaN(offset)) {
				offset = Number(offset);
			} else {
				offset = null;
			}

			if (!isNaN(limit)) {
				limit = Number(limit);
			} else {
				limit = null;
			}

			const recipesFavoriteWothDetails: any = await RecipeFavoriteService.getRecipesFavoriteWithDetailsByUserId(
				Number(req.params.userId),
				offset,
				limit
			);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipesFavoriteWothDetails));
		} catch (error: any) {
			console.log(error);
			ResponseUtils.getException(res, error);
		}
	};

	static getRecipeFavoriteWithDetailsByUserIdAndRecipeId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavoriteWithDetails: Recipe = (await RecipeFavoriteService.getRecipeFavoriteWithDetailsByUserIdAndRecipeId(
				Number(req.params.userId),
				Number(req.params.recipeId)
			)) as Recipe;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipeFavoriteWithDetails));
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

	static deleteRecipeFavoriteByUserIdAndRecipeId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavoriteWithDetails: any = await RecipeFavoriteService.deleteRecipeFavoriteByUserIdAndRecipeId(
				Number(req.params.userId),
				Number(req.params.recipeId)
			);
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipeFavoriteWithDetails));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};
}
