import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import Recipe from "../model/entity/Recipe";
import RecipeRepository from "../repository/RecipeRepository";

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
}
