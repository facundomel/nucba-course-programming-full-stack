import { Request, Response } from "express";
import Utils from "../utils/Utils";
import RecipeCategory from "../model/entity/RecipeCategory";
import RecipeCategoryService from "../service/RecipeCategoryService";
import ResponseUtils from "../utils/ResponseUtils";

export default class RecipeCategoryController {
	static getRecipesCategories = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipesCategories: RecipeCategory[] = (await RecipeCategoryService.getRecipesCategories()) as RecipeCategory[];
			ResponseUtils.ok(res, recipesCategories);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};

	static createRecipeCategory = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeCategory: RecipeCategory = await RecipeCategoryService.createRecipeCategory(
				Utils.convertFromSnakeToCamel(req.body) as RecipeCategory
			);
			ResponseUtils.created(res, recipeCategory);
		} catch (error: any) {
			ResponseUtils.exception(res, error);
		}
	};
}
