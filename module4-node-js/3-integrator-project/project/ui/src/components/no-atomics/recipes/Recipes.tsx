import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardRecipe from "./CardRecipe";
import { MessageNotExistRecipes, RecipesContainer } from "./RecipesStyles";
import localStorage, { KEY_RECIPES_ALL } from "../../../repository/LocalStorage";
import SnackbarCustom from "../snackbar/SnackbarCustom";
import * as snackbarActions from "../../../redux/snackbar/SnackbarActions";

const Recipes = () => {
	const { recipesAll, recipesFiltered } = useSelector((state) => (state as any).recipes);
	const selectedCategory = useSelector((state) => (state as any).categories.selectedCategory);
	const [shouldShowRecipesByCategory, setShouldShowRecipesByCategory] = useState(true);
	const { optionsSnackbar } = useSelector((state) => (state as any).snackbar);
	const dispatch = useDispatch();

	useEffect(() => {
		localStorage.save(KEY_RECIPES_ALL, recipesAll);
	}, [recipesAll]);

	useEffect(() => {
		setShouldShowRecipesByCategory(
			recipesFiltered.some((recipe: any) => {
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
						{recipesFiltered.map((recipe: any) => (
							<CardRecipe key={recipe.id} {...recipe} />
						))}
					</RecipesContainer>
				)
			) : (
				selectedCategory &&
				(shouldShowRecipesByCategory ? (
					<RecipesContainer>
						{recipesFiltered.map((recipe: any) => recipe.category == selectedCategory && <CardRecipe key={recipe.id} {...recipe} />)}
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
