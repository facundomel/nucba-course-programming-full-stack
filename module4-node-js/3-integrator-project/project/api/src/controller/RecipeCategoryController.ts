import { Request, Response } from "express";
import Utils from "../utils/Utils";
import RecipeCategory from "../model/entity/RecipeCategory";
import RecipeCategoryService from "../service/RecipeCategoryService";
import ControllerUtils from "../utils/ControllerUtils";

export default class RecipeCategoryController {
	static getRecipesCategory = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipesCategory: RecipeCategory[] = (await RecipeCategoryService.getRecipesCategory()) as RecipeCategory[];
			ControllerUtils.ok(res, recipesCategory);
		} catch (error: any) {
			ControllerUtils.exception(res, error);
		}
	};

	static createRecipeCategory = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeCategory: RecipeCategory = await RecipeCategoryService.createRecipeCategory(
				Utils.convertFromSnakeToCamel(req.body) as RecipeCategory
			);
			ControllerUtils.created(res, recipeCategory);
		} catch (error: any) {
			ControllerUtils.exception(res, error);
		}
	};
}
