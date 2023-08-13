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

	static createRecipeCategory = async (newRecipeCategory: RecipeCategory): Promise<RecipeCategory> => {
		try {
			const recipeCategory: RecipeCategory = await RecipeCategoryRepository.createRecipeCategory(newRecipeCategory);
			return recipeCategory;
		} catch (error: any) {
			throw error;
		}
	};
}
