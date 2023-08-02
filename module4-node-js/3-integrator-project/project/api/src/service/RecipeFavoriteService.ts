import { StatusCodes } from "http-status-codes";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import RecipeFavoriteRepository from "../repository/RecipeFavoriteRepository";
import CustomException from "../model/CustomException";
import Recipe from "../model/entity/Recipe";
import User from "../model/entity/User";
import UserService from "./UserService";
import RecipeService from "./RecipeService";

export default class RecipeFavoriteService {
	static getRecipesFavoriteByUserId = async (userId: number): Promise<RecipeFavorite[]> => {
		try {
			const recipesFavorite: RecipeFavorite[] = (await RecipeFavoriteRepository.getRecipesFavoriteByUserId(userId)) as RecipeFavorite[];
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
			if (recipeFavorite == null) throw new CustomException("Recipe favorite by user and recipe not found", StatusCodes.NOT_FOUND);
			return recipeFavorite;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipesFavoriteWithDetailsByUserId = async (userId: number): Promise<Recipe[]> => {
		try {
			const recipesFavoriteWithDetails: Recipe[] = (await RecipeFavoriteRepository.getRecipesFavoriteWithDetailsByUserId(
				userId
			)) as Recipe[];
			return recipesFavoriteWithDetails;
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
				throw new CustomException("Recipe favorite by user and recipe not found", StatusCodes.NOT_FOUND);
			return recipeFavoriteWithDetails;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipeFavorite = async (newRecipeFavorite: RecipeFavorite): Promise<RecipeFavorite> => {
		try {
			await UserService.getUserById(newRecipeFavorite.userId);
			await RecipeService.getRecipeById(newRecipeFavorite.recipeId);
			const recipeFavoriteWithDetails: Recipe = (await RecipeFavoriteRepository.getRecipeFavoriteWithDetailsByUserIdAndRecipeId(
				newRecipeFavorite.userId,
				newRecipeFavorite.recipeId
			)) as Recipe;
			if (recipeFavoriteWithDetails != null) throw new CustomException("Recipe favorite already exist", StatusCodes.CONFLICT);
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
			return null;
		} catch (error: any) {
			throw error;
		}
	};
}
