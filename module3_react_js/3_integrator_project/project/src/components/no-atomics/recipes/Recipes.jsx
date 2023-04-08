import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CardRecipe } from "./CardRecipe";
import { RecipesContainer } from "./RecipesStyles";
import localStorage from "../../../repository/LocalStorage";

export const Recipes = () => {
	const { recipesAll, recipesFiltered } = useSelector((state) => state.recipes);

	useEffect(() => {
		localStorage.save("recipesAll", recipesAll);
	}, [recipesAll]);

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
