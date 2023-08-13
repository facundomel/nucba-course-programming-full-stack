import { Repository } from "typeorm";
import Database from "./database/Database";
import RecipeCategory from "../model/entity/RecipeCategory";

export default class RecipeCategoryRepository {
	static recipeCategoryRepository: Repository<RecipeCategory>;

	static {
		Database.getConnection()
			.then((dataSource) => {
				this.recipeCategoryRepository = dataSource.getRepository(RecipeCategory);
			})
			.catch((error: any) => {
				throw error;
			});
	}

	static getRecipesCategory = async (): Promise<RecipeCategory[]> => {
		try {
			const recipesCategory: RecipeCategory[] = (await this.recipeCategoryRepository
				.createQueryBuilder()
				.select("recipes_category")
				.from(RecipeCategory, "recipes_category")
				.getMany()) as RecipeCategory[];
			return recipesCategory;
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
