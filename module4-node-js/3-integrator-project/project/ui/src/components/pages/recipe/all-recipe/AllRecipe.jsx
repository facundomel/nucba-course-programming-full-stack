import React, { useEffect } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { AllRecipeContainer } from "./AllRecipeStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import RecipeService from "../../../../service/RecipeService";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";

const AllRecipe = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.setUserSection("AllRecipe"));
		handlerSetRecipesAll();
	}, []);

	const handlerSetRecipesAll = async () => {
		try {
			const recipes = await RecipeService.getRecipes();
			dispatch(recipesActions.setRecipesAll(recipes));
		} catch (err) {}
	};

	return (
		<>
			<AllRecipeContainer>
				<Hero />
				<Categories />
				<Recipes />
			</AllRecipeContainer>
		</>
	);
};

export default AllRecipe;
