import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../components/pages/user/login/Login";
import { useDispatch, useSelector } from "react-redux";
import Register from "../components/pages/user/register/Register";
import ForgotPassword from "../components/pages/user/forgot-password/ForgotPassword";
import PageNotFound from "../components/pages/page-not-found/PageNotFound";
import RecipeFavorite from "../components/pages/recipe/recipe-favorite/RecipeFavorite";
import CreateRecipe from "../components/pages/recipe/create-recipe/CreateRecipe";
import RecipeAll from "../components/pages/recipe/recipe-all/RecipeAll";
import RecipeService from "../service/RecipeService";
import * as recipesActions from "../redux/recipes/RecipesActions.js";

const Router = () => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loadingRecipeAll, setLoadingRecipeAll] = useState(true);
	const [loadingRecipeFavorite, setLoadingRecipeFavorite] = useState(true);

	// useEffect(() => {
	// 	handlerSetRecipesAll();
	// }, []);

	// const handlerSetRecipesAll = async () => {
	// 	const recipes = await RecipeService.getRecipes();
	// 	dispatch(recipesActions.setRecipesAll(recipes));
	// };

	useEffect(() => {
		handlerSetRecipesAll();
	}, []);

	const handlerSetRecipesAll = async () => {
		try {
			// console.log(recipesAll);
			// if (recipesAll.length === 0) {
			// 	console.log("object");
			const recipes = await RecipeService.getRecipes();
			dispatch(recipesActions.setRecipesAll(recipes));
			// }
			setLoadingRecipeAll(false);

			// if (recipesFavorite.length === 0) {
			const recipesFavorite = await RecipeService.getRecipesFavoriteByUserId(currentUser, navigate, dispatch);
			dispatch(recipesActions.setRecipesFavorite(recipesFavorite));
			// }
			setLoadingRecipeFavorite(false);

			// setLoading(false);
		} catch (err) {
			// setLoading(false);
		}
	};

	return (
		<Routes>
			<Route path="*" element={<PageNotFound />} />
			<Route path="/" element={<RecipeAll loadingRecipeAll={loadingRecipeAll} />} />
			<Route path="registro" element={<Register />} />
			<Route path="login" element={<Login />} />
			<Route path="recuperar-password" element={<ForgotPassword />} />
			{currentUser && (
				<>
					<Route path="recetas-favoritas" element={<RecipeFavorite loadingRecipeFavorite={loadingRecipeFavorite} />} />
					<Route path="crear-receta" element={<CreateRecipe />} />
				</>
			)}
		</Routes>
	);
};

export default Router;
