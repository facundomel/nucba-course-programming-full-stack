import React from "react";
import Hero from "../../no-atomics/hero/Hero";
import { Recipes } from "../../no-atomics/recipes/Recipes";
import { HomeContainer } from "./HomeStyles";
import DataRecipes from "../../../assets/data/DataRecipes";

export const Home = () => {
	const recipesToFilter = DataRecipes.getData();

	return (
		<>
			<HomeContainer>
				<Hero recipesToFilter={recipesToFilter} />
				<Recipes />
			</HomeContainer>
		</>
	);
};
