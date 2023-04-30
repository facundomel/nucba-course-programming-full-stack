import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardRecipe } from "./CardRecipe";
import { MessageNotExistRecipes, RecipesContainer } from "./RecipesStyles";
import localStorage, { KEY_RECIPES_ALL } from "../../../repository/LocalStorage";
import { SnackbarCustom } from "../snackbar/SnackbarCustom";

export const Recipes = () => {
	const { recipesAll, recipesFiltered } = useSelector((state) => state.recipes);
	const selectedCategory = useSelector((state) => state.categories.selectedCategory);
	const [shouldShowRecipesByCategory, setShouldShowRecipesByCategory] = useState(true);
	const [optionsSnackbar, setOptionsSnackbar] = useState({ open: false, severity: null, message: null });

	useEffect(() => {
		localStorage.save(KEY_RECIPES_ALL, recipesAll);
	}, [recipesAll]);

	useEffect(() => {
		setShouldShowRecipesByCategory(
			recipesFiltered.some((recipe) => {
				return recipe.category == selectedCategory;
			})
		);
	}, [selectedCategory, recipesAll]);

	return (
		<>
			{!selectedCategory ? (
				recipesFiltered.length == 0 ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				) : (
					<RecipesContainer>
						{recipesFiltered.map((recipe) => (
							<CardRecipe setOptionsSnackbar={setOptionsSnackbar} key={recipe.id} {...recipe} />
						))}
					</RecipesContainer>
				)
			) : (
				selectedCategory &&
				(shouldShowRecipesByCategory ? (
					<RecipesContainer>
						{recipesFiltered.map((recipe) => recipe.category == selectedCategory && <CardRecipe key={recipe.id} {...recipe} />)}
					</RecipesContainer>
				) : !shouldShowRecipesByCategory && recipesFiltered.length > 0 ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas de esta categoría</MessageNotExistRecipes>
				) : (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				))
			)}

			<SnackbarCustom
				openSnackbar={optionsSnackbar.open}
				setCloseSnackbar={() => setOptionsSnackbar({ ...optionsSnackbar, open: false })}
				severity={optionsSnackbar.severity}
				message={optionsSnackbar.message}
			/>
		</>
	);
};
