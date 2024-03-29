import { DataSource, Repository } from "typeorm";
import RecipeCategory from "../model/entity/RecipeCategory";

export default class RecipeCategoryRepository {
	private static recipeCategoryRepository: Repository<RecipeCategory>;

	static init = async (dataSource: DataSource) => {
		try {
			this.recipeCategoryRepository = dataSource.getRepository(RecipeCategory);
		} catch (error) {
			console.error("Error initializing RecipeCategoryRepository: ", error);
			throw error;
		}
	};

	static getRecipesCategories = async (): Promise<RecipeCategory[]> => {
		try {
			const recipesCategories: RecipeCategory[] = (await this.recipeCategoryRepository
				.createQueryBuilder()
				.select("recipes_categories")
				.from(RecipeCategory, "recipes_categories")
				.orderBy("recipes_categories.title")
				.getMany()) as RecipeCategory[];
			return recipesCategories;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeCategoryById = async (recipeCategoryId: number): Promise<RecipeCategory> => {
		try {
			const recipeCategory: RecipeCategory = (await this.recipeCategoryRepository
				.createQueryBuilder()
				.select("recipes_categories")
				.from(RecipeCategory, "recipes_categories")
				.where("recipes_categories.id = :id", { id: recipeCategoryId })
				.getOne()) as RecipeCategory;
			return recipeCategory;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeCategoryByName = async (categoryName: string): Promise<RecipeCategory> => {
		try {
			const recipeCategory: RecipeCategory = (await this.recipeCategoryRepository
				.createQueryBuilder()
				.select("recipes_categories")
				.from(RecipeCategory, "recipes_categories")
				.where("recipes_categories.category = :category", { category: categoryName })
				.getOne()) as RecipeCategory;
			return recipeCategory;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipeCategory = async (newRecipeCategory: RecipeCategory): Promise<RecipeCategory> => {
		try {
			const recipeCategory: RecipeCategory = (await this.recipeCategoryRepository.save(newRecipeCategory)) as RecipeCategory;
			return recipeCategory;
		} catch (error: any) {
			throw error;
		}
	};
}
