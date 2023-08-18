import RecipeCategoryRepository from "../repository/RecipeCategoryRepository";
import RecipeCategory from "../model/entity/RecipeCategory";
import UserService from "./UserService";
import User from "../model/entity/User";
import CustomException from "../model/CustomException";
import { StatusCodes } from "http-status-codes";

export default class RecipeCategoryService {
	static getRecipesCategories = async (): Promise<RecipeCategory[]> => {
		try {
			const recipesCategories: RecipeCategory[] = (await RecipeCategoryRepository.getRecipesCategories()) as RecipeCategory[];
			return recipesCategories;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeCategoryById = async (recipeCategoryId: number): Promise<RecipeCategory> => {
		try {
			const recipeCategory: RecipeCategory = (await RecipeCategoryRepository.getRecipeCategoryById(recipeCategoryId)) as RecipeCategory;
			if (recipeCategory == null) throw new CustomException("Recipe category not found", StatusCodes.NOT_FOUND);
			return recipeCategory;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipeCategory = async (newRecipeCategory: RecipeCategory): Promise<RecipeCategory> => {
		try {
			await UserService.getUserById(newRecipeCategory.userId, true);
			const recipeCategory: RecipeCategory = (await RecipeCategoryRepository.getRecipeCategoryByCategoryName(
				newRecipeCategory.category
			)) as RecipeCategory;
			if (recipeCategory != null) throw new CustomException("Recipe category already exist", StatusCodes.CONFLICT);
			const recipeCategoryCreated: RecipeCategory = await RecipeCategoryRepository.createRecipeCategory(newRecipeCategory);
			return recipeCategoryCreated;
		} catch (error: any) {
			throw error;
		}
	};
}
