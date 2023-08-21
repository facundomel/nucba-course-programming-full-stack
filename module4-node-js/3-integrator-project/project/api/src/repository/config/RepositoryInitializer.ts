import { DataSource } from "typeorm";
import RecipeCategoryRepository from "../RecipeCategoryRepository";
import RecipeFavoriteRepository from "../RecipeFavoriteRepository";
import RecipeRepository from "../RecipeRepository";
import UserRepository from "../UserRepository";
import UserRoleRepository from "../UserRoleRepository";

export default class RepositoryInitializer {
	private static readonly repositories: any[] = [
		RecipeCategoryRepository,
		RecipeFavoriteRepository,
		RecipeRepository,
		UserRepository,
		UserRoleRepository,
	];

	static initializeRepositories = async (dataSource: DataSource): Promise<void> => {
		try {
			for (const repository of this.repositories) {
				await repository.init(dataSource);
			}
		} catch (error) {
			console.error("Failed to initialize repositories: ", error);
			throw error;
		}
	};
}
