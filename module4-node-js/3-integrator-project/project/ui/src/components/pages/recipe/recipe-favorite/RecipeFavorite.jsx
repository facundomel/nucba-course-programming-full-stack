import React, { useEffect } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import { RecipeFavoriteContainer } from "./RecipeFavoriteStyles";

const RecipeFavorite = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.setUserSection("MyRecipes"));
	}, []);

	return (
		<>
			<RecipeFavoriteContainer>
				<Hero recipesToFilter={recipesAll.filter((recipe) => recipe.isFavorite)} />
				<Categories />
				<Recipes />
			</RecipeFavoriteContainer>
		</>
	);
};

export default RecipeFavorite;
