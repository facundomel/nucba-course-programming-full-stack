import { Repository } from "typeorm";
import Database from "./database/Database";
import Recipe from "../model/entity/Recipe";

export default class RecipeRepository {
	static recipeRepository: Repository<Recipe>;

	static {
		Database.getConnection()
			.then((dataSource) => {
				this.recipeRepository = dataSource.getRepository(Recipe);
			})
			.catch((error: any) => {
				throw error;
			});
	}

	static getRecipes = async (): Promise<Recipe[]> => {
		try {
			const recipes: Recipe[] = (await this.recipeRepository
				.createQueryBuilder()
				.select("recipes")
				.from(Recipe, "recipes")
				.getMany()) as unknown as Recipe[];
			return recipes;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeById = async (recipeId: number): Promise<Recipe> => {
		try {
			const recipe: Recipe = (await this.recipeRepository
				.createQueryBuilder()
				.select("recipes")
				.from(Recipe, "recipes")
				.where("recipes.id = :id", { id: recipeId })
				.getOne()) as Recipe;
			return recipe;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipe = async (newRecipe: Recipe): Promise<Recipe> => {
		try {
			const recipe: Recipe = (await this.recipeRepository.save(newRecipe)) as Recipe;
			return recipe;
		} catch (error: any) {
			throw error;
		}
	};

	static deleteRecipeById = async (recipeId: number): Promise<void> => {
		try {
			await this.recipeRepository.softDelete({ id: recipeId });
		} catch (error: any) {
			throw error;
		}
	};
}
