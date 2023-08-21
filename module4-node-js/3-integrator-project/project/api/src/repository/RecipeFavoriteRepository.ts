import { DataSource, Repository } from "typeorm";
import Database from "./database/Database";
import RecipeFavorite from "../model/entity/RecipesFavorite";
import Recipe from "../model/entity/Recipe";

export default class RecipeFavoriteRepository {
	static recipeFavoriteRepository: Repository<RecipeFavorite>;
	static recipeRepository: Repository<Recipe>;
	static readonly recipeFavoritefieldsToGet = [
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

	// static {
	// 	Database.getConnection()
	// 		.then((dataSource) => {
	// 			this.recipeFavoriteRepository = dataSource.getRepository(RecipeFavorite);
	// 			this.recipeRepository = dataSource.getRepository(Recipe);
	// 		})
	// 		.catch((error: any) => {
	// 			throw error;
	// 		});
	// }

	static init = async (dataSource: DataSource) => {
		try {
			this.recipeFavoriteRepository = dataSource.getRepository(RecipeFavorite);
			this.recipeRepository = dataSource.getRepository(Recipe);
		} catch (error) {
			console.error("Error initializing RecipeFavoriteRepository: ", error);
			throw error;
		}
	};

	static getRecipesFavoritesByUserId = async (userId: number): Promise<RecipeFavorite[]> => {
		try {
			const recipeFavorite: RecipeFavorite[] = (await this.recipeFavoriteRepository
				.createQueryBuilder()
				.select("recipes_favorites")
				.from(RecipeFavorite, "recipes_favorites")
				.where("recipes_favorites.userId = :userId", { userId: userId })
				.withDeleted()
				.getMany()) as RecipeFavorite[];
			return recipeFavorite;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeFavoriteByUserIdAndRecipeId = async (userId: number, recipeId: number): Promise<RecipeFavorite> => {
		try {
			const recipeFavorite: RecipeFavorite = (await this.recipeFavoriteRepository
				.createQueryBuilder()
				.select("recipes_favorites")
				.from(RecipeFavorite, "recipes_favorites")
				.where("recipes_favorites.userId = :userId", { userId: userId })
				.andWhere("recipes_favorites.recipeId = :recipeId", { recipeId: recipeId })
				.withDeleted()
				.getOne()) as RecipeFavorite;
			return recipeFavorite;
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipesFavoritesWithDetailsByUserId = async (userId: number, offset: any, limit: any): Promise<any> => {
		try {
			let query = this.recipeRepository
				.createQueryBuilder("recipes")
				.select(this.recipeFavoritefieldsToGet)
				.leftJoin("recipes.recipeCategory", "recipe_category")
				.innerJoin(
					RecipeFavorite,
					"recipeFavorite",
					"recipes.id = recipeFavorite.recipeId AND recipeFavorite.deletedDate is null AND recipeFavorite.userId = :userId",
					{ userId: userId }
				)
				.leftJoin("recipes.user", "users")
				.orderBy("recipes.title");

			if (offset !== null) {
				query = query.offset(offset);
			}

			if (limit !== null) {
				query = query.limit(limit);
			}

			const [recipes, totalRecipes] = await query.getManyAndCount();

			return { recipes, totalRecipes };
		} catch (error: any) {
			throw error;
		}
	};

	static getRecipeFavoriteWithDetailsByUserIdAndRecipeId = async (userId: number, recipeId: number): Promise<Recipe> => {
		try {
			const recipeFavorite: Recipe = (await this.recipeRepository
				.createQueryBuilder()
				.select(this.recipeFavoritefieldsToGet)
				.from(Recipe, "recipes")
				.leftJoin("recipes.recipeCategory", "recipe_category")
				.innerJoin(
					RecipeFavorite,
					"recipeFavorite",
					"recipes.id = recipeFavorite.recipeId " +
						"AND recipeFavorite.deletedDate is null " +
						"AND recipeFavorite.userId = :userId " +
						"AND recipeFavorite.recipeId = :recipeId",
					{ userId: userId, recipeId: recipeId }
				)
				.leftJoin("recipes.user", "users")
				.getOne()) as Recipe;
			return recipeFavorite;
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

	static deleteRecipeFavoriteByUserIdAndRecipeId = async (userId: number, recipeId: number): Promise<any> => {
		try {
			const result = await this.recipeFavoriteRepository.softDelete({ userId: userId, recipeId: recipeId });
			return result;
		} catch (error: any) {
			throw error;
		}
	};
}
