import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseUtils from "../utils/ResponseUtils";
import CurrentUser from "../model/CurrentUser";
import Recipe from "../model/entity/Recipe";
import RecipeService from "../service/RecipeService";

export default class RecipeController {
	static getRecipes = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipes: Recipe[] = (await RecipeService.getRecipes()) as Recipe[];
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipes));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static getRecipeById = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipe: Recipe = (await RecipeService.getRecipeById(Number(req.params.recipeId))) as Recipe;
			res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipe));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	static createRecipe = async (req: Request, res: Response): Promise<void> => {
		try {
			const recipe: Recipe = await RecipeService.createRecipe(ResponseUtils.convertFromSnakeToCamel(req.body) as Recipe);
			res.status(StatusCodes.CREATED).json(ResponseUtils.convertFromCamelToSnake(recipe));
		} catch (error: any) {
			ResponseUtils.getException(res, error);
		}
	};

	// static deleteRecipeById = async (req: Request, res: Response): Promise<void> => {
	// 	try {
	// 		const currentUser: CurrentUser = res.locals.currentUser;
	// 		const recipe: Recipe = (await RecipeService.deleteRecipeById(Number(req.params.id), currentUser.role, currentUser.userId)) as Recipe;
	// 		res.status(StatusCodes.OK).json(ResponseUtils.convertFromCamelToSnake(recipe));
	// 	} catch (error: any) {
	// 		ResponseUtils.getException(res, error);
	// 	}
	// };
}
