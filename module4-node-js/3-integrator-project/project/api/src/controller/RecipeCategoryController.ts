import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../utils/ResponseUtils";
import RecipeCategory from "../model/entity/RecipeCategory";
import RecipeCategoryService from "../service/RecipeCategoryService";

export default class RecipeCategoryController {
	static getRecipesCategory = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipesCategory: RecipeCategory[] = (await RecipeCategoryService.getRecipesCategory()) as RecipeCategory[];
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipesCategory));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static createRecipeCategory = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipeCategory: RecipeCategory = await RecipeCategoryService.createRecipeCategory(
				ResponseUtils.convertFromSnakeToCamel(req.body) as RecipeCategory
			);
			res.status(StatusCodes.CREATED).json(ResponseUtils.convertFromCamelToSnake(recipeCategory));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};
}
