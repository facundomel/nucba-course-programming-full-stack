import React, { useEffect } from "react";
import Hero from "../../no-atomics/hero/Hero";
import Recipes from "../../no-atomics/recipes/Recipes";
import { HomeContainer } from "./HomeStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../redux/user/UserActions.js";
import Categories from "../../no-atomics/recipes-category/Categories";

const Home = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.setUserSection("Home"));
	}, []);

	return (
		<>
			<HomeContainer>
				<Hero recipesToFilter={recipesAll} />
				<Categories />
				<Recipes />
			</HomeContainer>
		</>
	);
};

export default Home;
