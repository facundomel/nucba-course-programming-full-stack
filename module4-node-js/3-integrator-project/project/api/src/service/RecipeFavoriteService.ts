import { StatusCodes } from "http-status-codes";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import RecipeFavoriteRepository from "../repository/RecipeFavoriteRepository";
import CustomException from "../model/CustomException";
import Recipe from "../model/entity/Recipe";
import UserService from "./UserService";
import RecipeService from "./RecipeService";

export default class RecipeFavoriteService {
	static getRecipesFavoritesByUserId = async (userId: number): Promise<RecipeFavorite[]> => {
		try {
			await UserService.getUserById(userId, true);
			const recipesFavorite: RecipeFavorite[] = (await RecipeFavoriteRepository.getRecipesFavoritesByUserId(userId)) as RecipeFavorite[];
			return recipesFavorite;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeFavoriteByUserIdAndRecipeId = async (userId: number, recipeId: number): Promise<RecipeFavorite> => {
		try {
			const recipeFavorite: RecipeFavorite = (await RecipeFavoriteRepository.getRecipeFavoriteByUserIdAndRecipeId(
				userId,
				recipeId
			)) as RecipeFavorite;
			if (recipeFavorite == null) throw new CustomException("Recipe favorite by user_id and recipe_id not found", StatusCodes.NOT_FOUND);
			return recipeFavorite;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipesFavoritesWithDetailsByUserId = async (userId: number, offset: any, limit: any): Promise<any> => {
		try {
			await UserService.getUserById(userId, true);
			const results: any = await RecipeFavoriteRepository.getRecipesFavoritesWithDetailsByUserId(userId, offset, limit);
			if (offset === null && limit === null) {
				offset = 0;
				limit = results.totalRecipes;
			}
			return { recipes: results.recipes, paging: { offset: offset, limit: limit, total: results.totalRecipes } };
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeFavoriteWithDetailsByUserIdAndRecipeId = async (userId: number, recipeId: number): Promise<Recipe> => {
		try {
			const recipeFavoriteWithDetails: Recipe = (await RecipeFavoriteRepository.getRecipeFavoriteWithDetailsByUserIdAndRecipeId(
				userId,
				recipeId
			)) as Recipe;
			if (recipeFavoriteWithDetails == null)
				throw new CustomException("Recipe favorite by user_id and recipe_id not found", StatusCodes.NOT_FOUND);
			return recipeFavoriteWithDetails;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipeFavorite = async (newRecipeFavorite: RecipeFavorite): Promise<RecipeFavorite> => {
		try {
			await UserService.getUserById(newRecipeFavorite.userId, true);
			await RecipeService.getRecipeById(newRecipeFavorite.recipeId);
			const recipeFavoriteWithDetails: Recipe = (await RecipeFavoriteRepository.getRecipeFavoriteWithDetailsByUserIdAndRecipeId(
				newRecipeFavorite.userId,
				newRecipeFavorite.recipeId
			)) as Recipe;
			if (recipeFavoriteWithDetails != null) throw new CustomException("Recipe favorite already exist for the user", StatusCodes.CONFLICT);
			const recipeFavoriteCreated: RecipeFavorite = await RecipeFavoriteRepository.createRecipeFavorite(newRecipeFavorite);
			return recipeFavoriteCreated;
		} catch (error: any) {
			throw error;
		}
	};

	static deleteRecipeFavoriteByUserIdAndRecipeId = async (userId: number, recipeId: number): Promise<any> => {
		try {
			const recipeFavoriteWithDetails: Recipe = await this.getRecipeFavoriteWithDetailsByUserIdAndRecipeId(userId, recipeId);
			if (recipeFavoriteWithDetails != null) {
				const response = await RecipeFavoriteRepository.deleteRecipeFavoriteByUserIdAndRecipeId(userId, recipeId);
				if (response.affected > 0) {
					return recipeFavoriteWithDetails;
				}
			}
		} catch (error: any) {
			throw error;
		}
	};
}
