import React, { useEffect } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { RecipeAllContainer } from "./RecipeAllStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import RecipeService from "../../../../service/RecipeService";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";

const RecipeAll = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.setUserSection("RecipeAll"));
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
			<RecipeAllContainer>
				<Hero />
				<Categories />
				<Recipes />
			</RecipeAllContainer>
		</>
	);
};

export default RecipeAll;
