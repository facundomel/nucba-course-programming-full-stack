import RecipeCategoryRepository from "../repository/RecipeCategoryRepository";
import RecipeCategory from "../model/entity/RecipeCategory";

export default class RecipeCategoryService {
	static getRecipesCategories = async (): Promise<RecipeCategory[]> => {
		try {
			const recipesCategories: RecipeCategory[] = (await RecipeCategoryRepository.getRecipesCategories()) as RecipeCategory[];
			return recipesCategories;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipeCategory = async (newRecipeCategory: RecipeCategory): Promise<RecipeCategory> => {
		try {
			const recipeCategory: RecipeCategory = await RecipeCategoryRepository.createRecipeCategory(newRecipeCategory);
			return recipeCategory;
		} catch (error: any) {
			throw error;
		}
	};
}
