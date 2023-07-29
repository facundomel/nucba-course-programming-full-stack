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

const Recipes = () => {
	const { recipesAll, recipesFavorite, recipesFiltered } = useSelector((state) => state.recipes);
	const selectedCategory = useSelector((state) => state.categories.selectedCategory);
	const [shouldShowRecipesByCategory, setShouldShowRecipesByCategory] = useState(true);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser, userSection } = useSelector((state) => state.user);
	const [isOpenModal, setIsOpenModal] = useState(false);

	// useEffect(() => {
	// 	// localStorage.save(KEY_RECIPES_ALL, recipesAll);
	// 	handlerSetRecipesAll();
	// }, [recipesAll]);

	// const handlerSetRecipesAll = async () => {
	// 	const recipes = await RecipeService.getRecipes();
	// 	dispatch(recipesActions.setRecipesAll(recipes));
	// };

	// useEffect(() => {
	// 	console.log(recipesAll);
	// }, [recipesAll])

	useEffect(() => {
		// console.log(userSection);
		// console.log(currentUser);
		handlerSetRecipes();
	}, [recipesAll, recipesFavorite]);

	useEffect(() => {
		setShouldShowRecipesByCategory(
			recipesFiltered.some((recipe) => {
				return recipe.recipeCategory.category === selectedCategory;
			})
		);
	}, [selectedCategory]);

	const handlerSetRecipes = async () => {
		let recipes = [];

		if (userSection === "AllRecipe") {
			// recipes = await RecipeService.getRecipes();
			// dispatch(recipesActions.setRecipesAll(recipes));
			dispatch(recipesActions.setRecipesFiltered(recipesAll));
		} else if (userSection === "RecipeFavorite") {
			// recipes = await RecipeService.getRecipesFavoriteByUserId(currentUser);
			// dispatch(recipesActions.setRecipesFavorite(recipes));
			dispatch(recipesActions.setRecipesFiltered(recipesFavorite));
		}
	};

	return (
		<>
			{!selectedCategory ? (
				recipesFiltered.length === 0 ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				) : (
					<RecipesContainer>
						{recipesFiltered.map((recipe) => (
							<CardRecipe key={recipe.id} recipe={recipe} setIsOpenModal={setIsOpenModal} />
						))}
					</RecipesContainer>
				)
			) : (
				selectedCategory &&
				(shouldShowRecipesByCategory ? (
					<RecipesContainer>
						{recipesFiltered.map(
							(recipe) =>
								recipe.recipeCategory.category === selectedCategory && (
									<CardRecipe key={recipe.id} recipe={recipe} setIsOpenModal={setIsOpenModal} />
								)
						)}
					</RecipesContainer>
				) : !shouldShowRecipesByCategory && recipesFiltered.length > 0 ? (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas de esta categoría</MessageNotExistRecipes>
				) : (
					<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
				))
			)}

			{currentUser && !isOpenModal && (
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
