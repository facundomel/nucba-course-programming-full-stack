import React, { useEffect } from "react";
import Hero from "../../no-atomics/hero/Hero";
import { Recipes } from "../../no-atomics/recipes/Recipes";
import { MyRecipesContainer } from "./MyRecipesStyles";
import { useDispatch, useSelector } from "react-redux";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";
import Categories from "../../no-atomics/recipes-category/Categories";

export const MyRecipes = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(recipesActions.setRecipeSection("MyRecipes"));
	}, []);

	return (
		<>
			<MyRecipesContainer>
				<Hero recipesToFilter={recipesAll.filter((recipe) => recipe.isFavorite)} />
				<Categories />
				<Recipes />
			</MyRecipesContainer>
		</>
	);
};
