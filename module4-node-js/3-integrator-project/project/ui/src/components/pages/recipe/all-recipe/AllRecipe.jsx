import React, { useEffect } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { AllRecipeContainer } from "./AllRecipeStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";

const AllRecipe = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.setUserSection("AllRecipe"));
	}, []);

	return (
		<>
			<AllRecipeContainer>
				<Hero recipesToFilter={recipesAll} />
				<Categories />
				<Recipes />
			</AllRecipeContainer>
		</>
	);
};

export default AllRecipe;
