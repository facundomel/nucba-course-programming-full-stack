import { DataSource, Repository } from "typeorm";
import Recipe from "../model/entity/Recipe";

export default class RecipeRepository {
	private static recipeRepository: Repository<Recipe>;
	private static readonly recipeFieldsToGet = [
		"recipes",
		"recipe_category.id",
		"recipe_category.category",
		"recipe_category.title",
		"recipe_category.urlImage",
		"users.id",
		"users.firstName",
		"users.lastName",
		"users.email",
	];

	static init = async (dataSource: DataSource) => {
		try {
			this.recipeRepository = dataSource.getRepository(Recipe);
		} catch (error) {
			console.error("Error initializing RecipeRepository: ", error);
			throw error;
		}
	};

	static getRecipes = async (offset: number, limit: number): Promise<any> => {
		try {
			const [recipes, totalRecipes] = await this.recipeRepository
				.createQueryBuilder("recipes")
				.select(this.recipeFieldsToGet)
				.leftJoin("recipes.recipeCategory", "recipe_category")
				.where("recipes.categoryId = recipe_category.id")
				.leftJoin("recipes.user", "users")
				.where("recipes.userId = users.id")
				.orderBy("recipes.title")
				.offset(offset)
				.limit(limit)
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
				.select(this.recipeFieldsToGet)
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
