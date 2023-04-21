import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardRecipe } from "./CardRecipe";
import { MessageNotExistRecipes, RecipesContainer } from "./RecipesStyles";
import localStorage, { KEY_RECIPES_ALL } from "../../../repository/LocalStorage";

export const Recipes = () => {
	const { recipesAll, recipesFiltered } = useSelector((state) => state.recipes);
	const selectedCategory = useSelector((state) => state.categories.selectedCategory);
	const [shouldShowRecipesByCategory, setShouldShowRecipesByCategory] = useState(true);

	useEffect(() => {
		localStorage.save(KEY_RECIPES_ALL, recipesAll);
	}, [recipesAll]);

	useEffect(() => {
		setShouldShowRecipesByCategory(
			recipesFiltered.some((recipe) => {
				return recipe.category == selectedCategory;
			})
		);
	}, [selectedCategory]);

	return (
		<>
			{!selectedCategory ? (
				recipesFiltered.length == 0 ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				) : (
					<RecipesContainer>
						{recipesFiltered.map((recipe) => (
							<CardRecipe key={recipe.id} {...recipe} />
						))}
					</RecipesContainer>
				)
			) : selectedCategory && shouldShowRecipesByCategory ? (
				!recipesFiltered.some((recipe) => recipe.category == selectedCategory) ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				) : (
					<RecipesContainer>
						{recipesFiltered.map((recipe) => recipe.category == selectedCategory && <CardRecipe key={recipe.id} {...recipe} />)}
					</RecipesContainer>
				)
			) : (
				<MessageNotExistRecipes>¡Lo sentimos! No existen recetas de esta categoría</MessageNotExistRecipes>
			)}
		</>
	);
};
