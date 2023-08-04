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

	static getRecipes = async (offset: number, limit: number): Promise<any> => {
		try {
			const [recipes, totalRecipes] = await this.recipeRepository
				.createQueryBuilder("recipes")
				.select([
					"recipes",
					"recipe_category.id",
					"recipe_category.category",
					"recipe_category.title",
					"recipe_category.urlImage",
					"users.id",
					"users.firstName",
					"users.lastName",
					"users.email",
				])
				.offset(offset)
				.limit(limit)
				.leftJoin("recipes.recipeCategory", "recipe_category")
				.where("recipes.categoryId = recipe_category.id")
				.leftJoin("recipes.user", "users")
				.where("recipes.userId = users.id")
				.getManyAndCount();

			return { recipes, totalRecipes };
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeById = async (recipeId: number): Promise<Recipe> => {
		try {
			const recipe: Recipe = (await this.recipeRepository
				.createQueryBuilder()
				.select([
					"recipes",
					"recipe_category.id",
					"recipe_category.category",
					"recipe_category.title",
					"recipe_category.urlImage",
					"users.id",
					"users.firstName",
					"users.lastName",
					"users.email",
				])
				.from(Recipe, "recipes")
				.leftJoin("recipes.recipeCategory", "recipe_category")
				.where("recipes.categoryId = recipe_category.id")
				.leftJoin("recipes.user", "users")
				.where("recipes.userId = users.id")
				.andWhere("recipes.id = :id", { id: recipeId })
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
