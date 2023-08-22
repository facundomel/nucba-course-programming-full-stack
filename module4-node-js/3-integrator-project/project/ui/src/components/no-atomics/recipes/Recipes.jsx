import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "./CardRecipe";
import { MessageNotExistRecipes, RecipesContainer } from "./RecipesStyles";
import SnackbarCustom from "../snackbar/SnackbarCustom";
import * as snackbarActions from "../../../redux/snackbar/SnackbarActions.js";
import FloatingButton from "../../atomics/button/FloatingButton";
import { useNavigate } from "react-router-dom";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";
import { v4 as uuid } from "uuid";
import { RecipePageSection } from "../../../model/enum/PageSection";

const Recipes = ({ messageNotExistRecipes, loading }) => {
	const { recipesAll, recipesFavorite, recipesFiltered } = useSelector((state) => state.recipes);
	const selectedCategory = useSelector((state) => state.categories.selectedCategory);
	const [shouldShowRecipesByCategory, setShouldShowRecipesByCategory] = useState(false);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const { pageSection } = useSelector((state) => state.pageSection);

	useEffect(() => {
		if (pageSection === RecipePageSection.RecipeAll) {
			dispatch(recipesActions.setRecipesFiltered(recipesAll));
		} else if (pageSection === RecipePageSection.RecipeFavorite) {
			dispatch(recipesActions.setRecipesFiltered(recipesFavorite));
		}
	}, [pageSection, recipesAll, recipesFavorite]);

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
					messageNotExistRecipes && <MessageNotExistRecipes>{messageNotExistRecipes}</MessageNotExistRecipes>
				) : (
					<RecipesContainer>
						{recipesFiltered.map((recipe) => (
							<CardRecipe key={uuid()} recipe={recipe} />
						))}
					</RecipesContainer>
				)
			) : selectedCategory && shouldShowRecipesByCategory ? (
				<RecipesContainer>
					{recipesFiltered.map(
						(recipe) => recipe.recipeCategory.category === selectedCategory && <CardRecipe key={uuid()} recipe={recipe} />
					)}
				</RecipesContainer>
			) : !shouldShowRecipesByCategory && recipesFiltered.length > 0 ? (
				<MessageNotExistRecipes>¡Lo sentimos! No existen recetas de esta categoría</MessageNotExistRecipes>
			) : (
				<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
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
