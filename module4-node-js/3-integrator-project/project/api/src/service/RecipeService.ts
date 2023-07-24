import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import Recipe from "../model/entity/Recipe";
import UserRoleStringEnum from "../model/enum/UserRoleEnum";
import RecipeRepository from "../repository/RecipeRepository";

export default class RecipeService {
	static getRecipes = async (): Promise<Recipe[]> => {
		try {
			const recipes: Recipe[] = (await RecipeRepository.getRecipes()) as Recipe[];
			return recipes;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeById = async (recipeId: number, userRole: UserRoleStringEnum, userIdSession: number): Promise<Recipe> => {
		try {
			const recipe: Recipe = (await RecipeRepository.getRecipeById(recipeId)) as Recipe;
			if (recipe == null) throw new CustomException("Recipe not found", StatusCodes.NOT_FOUND);
			if (
				(userRole && userRole == UserRoleStringEnum.ADMIN) ||
				(userRole && userRole == UserRoleStringEnum.USER && recipe.userId == userIdSession)
			) {
				return recipe;
			}
			throw new CustomException("User not authorized", StatusCodes.UNAUTHORIZED);
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

	static deleteRecipeById = async (recipeId: number, userRole: UserRoleStringEnum, userIdSession: number): Promise<Recipe> => {
		try {
			let recipe: Recipe = (await this.getRecipeById(recipeId, userRole, userIdSession)) as Recipe;
			if (recipe.deletedDate != null) throw new CustomException("Recipe is already deleted", StatusCodes.CONFLICT);
			await RecipeRepository.deleteRecipeById(recipeId);
			recipe = (await this.getRecipeById(recipeId, userRole, userIdSession)) as Recipe;
			return recipe;
		} catch (error: any) {
			throw error;
		}
	};
}
