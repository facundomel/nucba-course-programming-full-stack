import React, { useEffect, useState } from "react";
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
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { currentUser, userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(userActions.setUserSection("RecipeFavorite"));
	}, []);

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
