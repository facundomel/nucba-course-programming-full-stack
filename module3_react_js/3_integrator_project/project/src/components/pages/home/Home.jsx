import React, { useEffect } from "react";
import Hero from "../../no-atomics/hero/Hero";
import { Recipes } from "../../no-atomics/recipes/Recipes";
import { HomeContainer } from "./HomeStyles";
import { useDispatch, useSelector } from "react-redux";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";

export const Home = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(recipesActions.setRecipeSection("Home"));
	}, []);

	return (
		<>
			<HomeContainer>
				<Hero recipesToFilter={recipesAll} />
				<Recipes />
			</HomeContainer>
		</>
	);
};
