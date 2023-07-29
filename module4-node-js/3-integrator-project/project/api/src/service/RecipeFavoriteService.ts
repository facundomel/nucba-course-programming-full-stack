import { StatusCodes } from "http-status-codes";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import RecipeFavoriteRepository from "../repository/RecipeFavoriteRepository";
import CustomException from "../model/CustomException";

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
			const recipeFavoriteResult: RecipeFavorite = (await RecipeFavoriteRepository.getRecipeFavoriteByUserIdAndRecipeId(
				userId,
				recipeId
			)) as RecipeFavorite;
			if (recipeFavoriteResult == null) throw new CustomException("Recipe favorite not found", StatusCodes.NOT_FOUND);
			return recipeFavoriteResult;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipeFavorite = async (newRecipeFavorite: RecipeFavorite): Promise<RecipeFavorite> => {
		try {
			const recipeFavorite = this.getRecipeFavoriteByUserIdAndRecipeId(newRecipeFavorite.userId, newRecipeFavorite.recipeId);
			if (recipeFavorite != null) throw new CustomException("Recipe favorite already exist", StatusCodes.CONFLICT);
			const recipeFavoriteCreated: RecipeFavorite = await RecipeFavoriteRepository.createRecipeFavorite(newRecipeFavorite);
			return recipeFavoriteCreated;
		} catch (error: any) {
			throw error;
		}
	};
}
