import React from "react";
import { useSelector } from "react-redux";
import { CardRecipe } from "./CardRecipe";
import { RecipesContainer, Test } from "./RecipesStyles";

export const Recipes = () => {
	const { recipesFiltered } = useSelector((state) => state.recipes);

	return (
		<>
			<RecipesContainer>
				{recipesFiltered.map((recipe) => (
					<CardRecipe key={recipe.id} {...recipe} />
				))}
			</RecipesContainer>
		</>
	);
};
