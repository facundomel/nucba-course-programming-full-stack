import { Request, Response } from "express";
import Utils from "../utils/Utils";
import Recipe from "../model/entity/Recipe";
import RecipeService from "../service/RecipeService";
import ControllerUtils from "../utils/ControllerUtils";

export default class RecipeController {
	static getRecipes = async (req: Request, res: Response): Promise<void> => {
		try {
			const offset = Number(req.query.offset) || 0;
			const limit = Number(req.query.limit) || 12;

			const recipes: any = await RecipeService.getRecipes(offset, limit);
			ControllerUtils.ok(res, recipes);
		} catch (error: any) {
			ControllerUtils.exception(res, error);
		}
	};

	static getRecipeById = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipe: Recipe = (await RecipeService.getRecipeById(Number(req.params.recipeId))) as Recipe;
			ControllerUtils.ok(res, recipe);
		} catch (error: any) {
			ControllerUtils.exception(res, error);
		}
	};

	static createRecipe = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipe: Recipe = await RecipeService.createRecipe(Utils.convertFromSnakeToCamel(req.body) as Recipe);
			ControllerUtils.created(res, recipe);
		} catch (error: any) {
			ControllerUtils.exception(res, error);
		}
	};
}
