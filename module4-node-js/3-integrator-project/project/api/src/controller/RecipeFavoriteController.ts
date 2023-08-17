import { Request, Response } from "express";
import Utils from "../utils/Utils";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import RecipeFavoriteService from "../service/RecipeFavoriteService";
import Recipe from "../model/entity/Recipe";
import ResponseUtils from "../utils/ResponseUtils";

export default class RecipeFavoriteController {
	static getRecipesFavoriteByUserId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipesFavorite: RecipeFavorite[] = (await RecipeFavoriteService.getRecipesFavoriteByUserId(
				Number(req.params.userId)
			)) as RecipeFavorite[];
			ResponseUtils.ok(res, recipesFavorite);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static getRecipeFavoriteByUserIdAndRecipeId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavorite: RecipeFavorite = (await RecipeFavoriteService.getRecipeFavoriteByUserIdAndRecipeId(
				Number(req.params.userId),
				Number(req.params.recipeId)
			)) as RecipeFavorite;
			ResponseUtils.ok(res, recipeFavorite);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
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

			const recipesFavoriteWithDetails: any = await RecipeFavoriteService.getRecipesFavoriteWithDetailsByUserId(
				Number(req.params.userId),
				offset,
				limit
			);
			ResponseUtils.ok(res, recipesFavoriteWithDetails);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static getRecipeFavoriteWithDetailsByUserIdAndRecipeId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavoriteWithDetails: Recipe = (await RecipeFavoriteService.getRecipeFavoriteWithDetailsByUserIdAndRecipeId(
				Number(req.params.userId),
				Number(req.params.recipeId)
			)) as Recipe;
			ResponseUtils.ok(res, recipeFavoriteWithDetails);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static createRecipeFavorite = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavorite: RecipeFavorite = await RecipeFavoriteService.createRecipeFavorite(
				Utils.convertFromSnakeToCamel(req.body) as RecipeFavorite
			);
			ResponseUtils.created(res, recipeFavorite);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static deleteRecipeFavoriteByUserIdAndRecipeId = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeFavoriteWithDetails: any = await RecipeFavoriteService.deleteRecipeFavoriteByUserIdAndRecipeId(
				Number(req.params.userId),
				Number(req.params.recipeId)
			);
			ResponseUtils.ok(res, recipeFavoriteWithDetails);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};
}
