import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../utils/ResponseUtils";
import CurrentUser from "../model/CurrentUser";
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

	// static getRecipeCategoryById = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const currentUser: CurrentUser = res.locals.currentUser;
	// 		const recipeCategory: RecipeCategory = (await RecipeCategoryService.getRecipeCategoryById(
	// 			Number(req.params.id),
	// 			currentUser.role,
	// 			currentUser.userId
	// 		)) as RecipeCategory;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipeCategory));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };

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

	// static deleteRecipeCategoryById = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const currentUser: CurrentUser = res.locals.currentUser;
	// 		const recipeCategory: RecipeCategory = (await RecipeCategoryService.deleteRecipeCategoryById(
	// 			Number(req.params.id),
	// 			currentUser.role,
	// 			currentUser.userId
	// 		)) as RecipeCategory;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipeCategory));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };
}
