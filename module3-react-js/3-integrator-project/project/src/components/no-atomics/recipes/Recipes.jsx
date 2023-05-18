import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "./CardRecipe";
import { MessageNotExistRecipes, RecipesContainer } from "./RecipesStyles";
import localStorage, { KEY_RECIPES_ALL } from "../../../repository/LocalStorage";
import SnackbarCustom from "../snackbar/SnackbarCustom";
import * as snackbarActions from "../../../redux/snackbar/SnackbarActions.js";

const Recipes = () => {
	const { recipesAll, recipesFiltered } = useSelector((state) => state.recipes);
	const selectedCategory = useSelector((state) => state.categories.selectedCategory);
	const [shouldShowRecipesByCategory, setShouldShowRecipesByCategory] = useState(true);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const dispatch = useDispatch();

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
							<CardRecipe key={recipe.id} {...recipe} />
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
				open={optionsSnackbar.open}
				onClose={() => dispatch(snackbarActions.setOptionsSnackbar({ ...optionsSnackbar, open: false }))}
				severity={optionsSnackbar.severity}
				message={optionsSnackbar.message}
				autoHideDuration={optionsSnackbar.autoHideDuration}
			/>
		</>
	);
};

export default Recipes;
