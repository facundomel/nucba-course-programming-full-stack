import React, { useEffect } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import { RecipeFavoriteContainer } from "./RecipeFavoriteStyles";
import RecipeService from "../../../../service/RecipeService";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import { useNavigate } from "react-router-dom";

const RecipeFavorite = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const { currentUser, userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(userActions.setUserSection("RecipeFavorite"));
		handlerSetRecipesFavorite();
	}, []);

	const handlerSetRecipesFavorite = async () => {
		try {
			const recipesFavorite = await RecipeService.getRecipesFavoriteByUserId(currentUser, navigate, dispatch);
			dispatch(recipesActions.setRecipesFavorite(recipesFavorite));
		} catch (err) {}
	};

	return (
		<>
			<RecipeFavoriteContainer>
				<Hero />
				<Categories />
				<Recipes />
			</RecipeFavoriteContainer>
		</>
	);
};

export default RecipeFavorite;
