import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import Recipe from "../model/entity/Recipe";
import { UserRoleStringEnum } from "../model/enum/UserRoleEnum";
import RecipeRepository from "../repository/RecipeRepository";
import RecipeFavorite from "../model/entity/RecipesFavorite";

export default class RecipeService {
	static getRecipes = async (offset: number, limit: number): Promise<any> => {
		try {
			const results: any = await RecipeRepository.getRecipes(offset, limit);
			return { recipes: results.recipes, paging: { offset: offset, limit: limit, total: results.totalRecipes } };
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeById = async (recipeId: number): Promise<Recipe> => {
		try {
			const recipe: Recipe = (await RecipeRepository.getRecipeById(recipeId)) as Recipe;
			if (recipe == null) throw new CustomException("Recipe not found", StatusCodes.NOT_FOUND);
			return recipe;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipe = async (newRecipe: Recipe): Promise<Recipe> => {
		try {
			const recipe: Recipe = await RecipeRepository.createRecipe(newRecipe);
			return recipe;
		} catch (error: any) {
			throw error;
		}
	};

	// static deleteRecipeById = async (recipeId: number, userRole: UserRoleStringEnum, userIdSession: number): Promise<Recipe> => {
	// 	try {
	// 		let recipe: Recipe = (await this.getRecipeById(recipeId, userRole, userIdSession)) as Recipe;
	// 		if (recipe.deletedDate != null) throw new CustomException("Recipe is already deleted", StatusCodes.CONFLICT);
	// 		await RecipeRepository.deleteRecipeById(recipeId);
	// 		recipe = (await this.getRecipeById(recipeId, userRole, userIdSession)) as Recipe;
	// 		return recipe;
	// 	} catch (error: any) {
	// 		throw error;
	// 	}
	// };
}
