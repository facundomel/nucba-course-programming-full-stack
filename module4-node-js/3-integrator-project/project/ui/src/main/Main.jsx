import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/no-atomics/footer/Footer";
import Navbar from "../components/no-atomics/navbar/Navbar";
import { MainContainerStyled } from "./MainStyles";
import Router from "./Router";
import { useDispatch, useSelector } from "react-redux";
import RecipeService from "../service/RecipeService";
import * as recipesActions from "../redux/recipes/RecipesActions.js";

const Main = () => {
	const [extendNavbar, setExtendNavbar] = useState(false);
	const { userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	handlerSetRecipesAll();
	// }, []);

	// const handlerSetRecipesAll = async () => {
	// 	const recipes = await RecipeService.getRecipes();
	// 	dispatch(recipesActions.setRecipesAll(recipes));
	// };

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [userSection]);

	return (
		<>
			<MainContainerStyled>
				<BrowserRouter>
					<Navbar extendNavbar={extendNavbar} setExtendNavbar={setExtendNavbar} />
					{!extendNavbar && <Router />}
					<Footer />
				</BrowserRouter>
			</MainContainerStyled>
		</>
	);
};

export default Main;
