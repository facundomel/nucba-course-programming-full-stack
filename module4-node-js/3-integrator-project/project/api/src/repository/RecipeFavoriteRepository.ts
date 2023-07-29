import { Repository } from "typeorm";
import Database from "./database/Database";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import Recipe from "../model/entity/Recipe";

export default class RecipeFavoriteRepository {
	static recipeFavoriteRepository: Repository<RecipeFavorite>;
	static readonly fieldRecipeFavoriteToGet = [
		"recipes_favorite",
		"users.id",
		"users.firstName",
		"users.lastName",
		"users.email",
		"recipes.id",
		"recipes.title",
		"recipes.description",
		"recipes.urlImage",
		"recipes.ingredients",
		"recipes.instructions",
		"recipe_category.id",
		"recipe_category.category",
		"recipe_category.title",
		"recipe_category.urlImage",
	];

	static {
		Database.getConnection()
			.then((dataSource) => {
				this.recipeFavoriteRepository = dataSource.getRepository(RecipeFavorite);
			})
			.catch((error: any) => {
				throw error;
			});
	}

	// static getRecipesFavoriteByUserId = async (userId: number): Promise<any[]> => {
	// 	try {
	// 		const recipeFavoriteFromDB: RecipeFavorite[] = (await this.recipeFavoriteRepository
	// 			.createQueryBuilder()
	// 			.select(this.fieldRecipeFavoriteToGet)
	// 			.from(RecipeFavorite, "recipes_favorite")
	// 			.where("recipes_favorite.userId = :userId", { userId: userId })
	// 			.leftJoin("recipes_favorite.user", "users")
	// 			.where("recipes_favorite.userId = users.id")
	// 			.leftJoin("recipes_favorite.recipe", "recipes")
	// 			.where("recipes_favorite.recipeId = recipes.id")
	// 			.leftJoin("recipes.recipeCategory", "recipe_category")
	// 			.where("recipes.categoryId = recipe_category.id")
	// 			.getMany()) as RecipeFavorite[];
	// 		return recipeFavoriteFromDB;
	// 	} catch (error: any) {
	// 		throw error;
	// 	}
	// };

	static getRecipesFavoriteByUserId = async (userId: number): Promise<any[]> => {
		try {
			const recipeFavoriteFromDB: Recipe[] = (await this.recipeFavoriteRepository
				.createQueryBuilder("recipes_favorite")
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
				.where("recipes.userId = :userId", { userId: userId })
				.leftJoin("recipes.user", "users")
				.where("recipes.userId = users.id")
				.leftJoin("recipes.recipeCategory", "recipe_category")
				.where("recipes.categoryId = recipe_category.id")
				.innerJoin("recipes", "recipe_favorite.recipe")
				.where("recipes.id = recipes_favorite.recipe_id")
				.andWhere("recipes.userId = recipes_favorite.user_id")
				.andWhere("recipes_favorite.userId = :userId", { userId: userId })
				.getMany()) as Recipe[];
			return recipeFavoriteFromDB;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeFavoriteByUserIdAndRecipeId = async (userId: number, recipeId: number): Promise<RecipeFavorite> => {
		try {
			const recipeFavoriteFromDB: RecipeFavorite = (await this.recipeFavoriteRepository
				.createQueryBuilder()
				.select(this.fieldRecipeFavoriteToGet)
				.from(RecipeFavorite, "recipes_favorite")
				.where("recipes_favorite.userId = :userId", { userId: userId })
				.andWhere("recipes_favorite.recipeId = :recipeId", { recipeId: recipeId })
				.leftJoin("recipes_favorite.user", "users")
				.where("recipes_favorite.userId = users.id")
				.andWhere("users.id = :userId", { userId: userId })
				.leftJoin("recipes_favorite.recipe", "recipes")
				.where("recipes_favorite.recipeId = recipes.id")
				.andWhere("recipes.id = :recipeId", { recipeId: recipeId })
				.leftJoin("recipes.recipeCategory", "recipe_category")
				.where("recipes.categoryId = recipe_category.id")
				.andWhere("recipes.id = :recipeId", { recipeId: recipeId })
				.getOne()) as RecipeFavorite;
			return recipeFavoriteFromDB;
		} catch (error: any) {
			throw error;
		}
	};

	static createRecipeFavorite = async (newRecipeFavorite: RecipeFavorite): Promise<RecipeFavorite> => {
		try {
			const recipeFavorite: RecipeFavorite = (await this.recipeFavoriteRepository.save(newRecipeFavorite)) as RecipeFavorite;
			return recipeFavorite;
		} catch (error: any) {
			throw error;
		}
	};
}
