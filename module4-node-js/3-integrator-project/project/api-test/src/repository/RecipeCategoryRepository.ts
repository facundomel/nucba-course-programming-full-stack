import { DataSource, Repository } from "typeorm";
import Database from "./database/Database";
import RecipeCategory from "../model/entity/RecipeCategory";

export default class RecipeCategoryRepository {
	static recipeCategoryRepository: Repository<RecipeCategory>;

	static async initializeRepository(dataSource: DataSource): Promise<void> {
		try {
			this.recipeCategoryRepository = dataSource.getRepository(RecipeCategory);
			console.log("RecipeFavoriteRepository initialized.");
		} catch (error) {
			console.error("Error initializing RecipeFavoriteRepository:", error);
			throw error;
		}
	}

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
