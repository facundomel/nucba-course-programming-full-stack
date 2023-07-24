import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import UserRoleStringEnum from "../model/enum/UserRoleEnum";
import RecipeCategoryRepository from "../repository/RecipeCategoryRepository";
import RecipeCategory from "../model/entity/RecipeCategory";

export default class RecipeCategoryService {
	static getRecipesCategory = async (): Promise<RecipeCategory[]> => {
		try {
			const recipesCategory: RecipeCategory[] = (await RecipeCategoryRepository.getRecipesCategory()) as RecipeCategory[];
			return recipesCategory;
		} catch (error: any) {
			throw error;
		}
	};

	// static getRecipeCategoryById = async (
	// 	recipeCategoryId: number,
	// 	userRole: UserRoleStringEnum,
	// 	userIdSession: number
	// ): Promise<RecipeCategory> => {
	// 	try {
	// 		const recipeCategory: RecipeCategory = (await RecipeCategoryRepository.getRecipeCategoryById(recipeCategoryId)) as RecipeCategory;
	// 		if (recipeCategory == null) throw new CustomException("Recipe category not found", StatusCodes.NOT_FOUND);
	// 		if (
	// 			(userRole && userRole == UserRoleStringEnum.ADMIN) ||
	// 			(userRole && userRole == UserRoleStringEnum.USER && recipeCategory.userId == userIdSession)
	// 		) {
	// 			return recipeCategory;
	// 		}
	// 		throw new CustomException("User not authorized", StatusCodes.UNAUTHORIZED);
	// 	} catch (error: any) {
	// 		throw error;
	// 	}
	// };

	static createRecipeCategory = async (newRecipeCategory: RecipeCategory): Promise<RecipeCategory> => {
		try {
			const recipeCategory: RecipeCategory = await RecipeCategoryRepository.createRecipeCategory(newRecipeCategory);
			return recipeCategory;
		} catch (error: any) {
			throw error;
		}
	};

	// static deleteRecipeCategoryById = async (
	// 	recipeCategoryId: number,
	// 	userRole: UserRoleStringEnum,
	// 	userIdSession: number
	// ): Promise<RecipeCategory> => {
	// 	try {
	// 		let recipeCategory: RecipeCategory = (await this.getRecipeCategoryById(recipeCategoryId, userRole, userIdSession)) as RecipeCategory;
	// 		if (recipeCategory.deletedDate != null) throw new CustomException("Recipe category is already deleted", StatusCodes.CONFLICT);
	// 		await RecipeCategoryRepository.deleteRecipeCategoryById(recipeCategoryId);
	// 		recipeCategory = (await this.getRecipeCategoryById(recipeCategoryId, userRole, userIdSession)) as RecipeCategory;
	// 		return recipeCategory;
	// 	} catch (error: any) {
	// 		throw error;
	// 	}
	// };
}
