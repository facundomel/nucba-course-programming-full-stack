import { Request, Response } from "express";
import Utils from "../utils/Utils";
import Recipe from "../model/entity/Recipe";
import RecipeService from "../service/RecipeService";
import ResponseUtils from "../utils/ResponseUtils";

export default class RecipeController {
	static getRecipes = async (req: Request, res: Response): Promise<void> => {
		try {
			const offset = Number(req.query.offset) || 0;
			const limit = Number(req.query.limit) || 12;

			const recipes: any = await RecipeService.getRecipes(offset, limit);
			ResponseUtils.ok(res, recipes);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static getRecipeById = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipe: Recipe = (await RecipeService.getRecipeById(Number(req.params.recipeId))) as Recipe;
			ResponseUtils.ok(res, recipe);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static createRecipe = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipe: Recipe = await RecipeService.createRecipe(Utils.convertFromSnakeToCamel(req.body) as Recipe);
			ResponseUtils.created(res, recipe);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};
}
