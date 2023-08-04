import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "./CardRecipe";
import { MessageNotExistRecipes, RecipesContainer } from "./RecipesStyles";
import localStorage, { KEY_RECIPES_ALL } from "../../../repository/LocalStorage";
import SnackbarCustom from "../snackbar/SnackbarCustom";
import * as snackbarActions from "../../../redux/snackbar/SnackbarActions.js";
import FloatingButton from "../../atomics/button/FloatingButton";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FloatinButtonStyled } from "../../atomics/button/FloatingButtonStyles";
import { useNavigate } from "react-router-dom";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";
import RecipeService from "../../../service/RecipeService";
import RecipeAll from "../../pages/recipe/recipe-all/RecipeAll";
import { v4 as uuid } from "uuid";
import PaginationCustom from "../pagination/PaginationCustom";

const Recipes = () => {
	const { recipesAll, recipesFavorite, recipesFiltered } = useSelector((state) => state.recipes);
	const selectedCategory = useSelector((state) => state.categories.selectedCategory);
	const [shouldShowRecipesByCategory, setShouldShowRecipesByCategory] = useState(false);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser, userSection } = useSelector((state) => state.user);

	useEffect(() => {
		if (userSection === "RecipeAll") {
			dispatch(recipesActions.setRecipesFiltered(recipesAll));
		} else if (userSection === "RecipeFavorite") {
			dispatch(recipesActions.setRecipesFiltered(recipesFavorite));
		}
	}, [userSection, recipesAll, recipesFavorite]);

	useEffect(() => {
		setShouldShowRecipesByCategory(
			recipesFiltered.some((recipe) => {
				return recipe.recipeCategory.category === selectedCategory;
			})
		);
	}, [selectedCategory]);

	return (
		<>
			{!selectedCategory ? (
				recipesFiltered.length === 0 ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				) : (
					<RecipesContainer>
						{recipesFiltered.map((recipe) => (
							<CardRecipe key={uuid()} recipe={recipe} />
						))}
					</RecipesContainer>
				)
			) : (
				selectedCategory &&
				(shouldShowRecipesByCategory ? (
					<RecipesContainer>
						{recipesFiltered.map(
							(recipe) => recipe.recipeCategory.category === selectedCategory && <CardRecipe key={uuid()} recipe={recipe} />
						)}
					</RecipesContainer>
				) : !shouldShowRecipesByCategory && recipesFiltered.length > 0 ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas de esta categoría</MessageNotExistRecipes>
				) : (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				))
			)}

			{currentUser && (
				<FloatingButton
					onClick={() => {
						navigate("/crear-receta");
					}}
				/>
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
