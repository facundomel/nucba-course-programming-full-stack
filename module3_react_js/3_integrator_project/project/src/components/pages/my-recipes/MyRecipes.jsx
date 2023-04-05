import React from "react";
import Hero from "../../no-atomics/hero/Hero";
import { Recipes } from "../../no-atomics/recipes/Recipes";
import { MyRecipesContainer } from "./MyRecipesStyles";
import DataRecipes from "../../../assets/data/DataRecipes";

export const MyRecipes = () => {
	const recipesToFilter = DataRecipes.getData().filter((recipe) => recipe.isFavorite);

	return (
		<>
			<MyRecipesContainer>
				<Hero recipesToFilter={recipesToFilter} />
				<Recipes />
			</MyRecipesContainer>
		</>
	);
};
