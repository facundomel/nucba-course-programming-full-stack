import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Footer from "../components/no-atomics/footer/Footer";
import Navbar from "../components/no-atomics/navbar/Navbar";
import { MainContainerStyled } from "./MainStyles";
import Router from "./Router";
import { useDispatch, useSelector } from "react-redux";
import RecipeService from "../service/RecipeService";
import * as recipesActions from "../redux/recipes/RecipesActions.js";
import PaginationCustom from "../components/no-atomics/pagination/PaginationCustom";

const Main = () => {
	const [extendNavbar, setExtendNavbar] = useState(false);
	const { userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// const { currentUser } = useSelector((state) => state.user);
	// const navigate = useNavigate();

	// // useEffect(() => {
	// // 	handlerSetRecipesAll();
	// // }, []);

	// // const handlerSetRecipesAll = async () => {
	// // 	const recipes = await RecipeService.getRecipes();
	// // 	dispatch(recipesActions.setRecipesAll(recipes));
	// // };

	// useEffect(() => {
	// 	handlerSetRecipesAll();
	// }, []);

	// const handlerSetRecipesAll = async () => {
	// 	try {
	// 		// console.log(recipesAll);
	// 		// if (recipesAll.length === 0) {
	// 		// 	console.log("object");
	// 		const recipes = await RecipeService.getRecipes();
	// 		dispatch(recipesActions.setRecipesAll(recipes));
	// 		// }

	// 		// if (recipesFavorite.length === 0) {
	// 		const recipesFavorite = await RecipeService.getRecipesFavoriteByUserId(currentUser, navigate, dispatch);
	// 		dispatch(recipesActions.setRecipesFavorite(recipesFavorite));
	// 		// }

	// 		// setLoading(false);
	// 	} catch (err) {
	// 		// setLoading(false);
	// 	}
	// };

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [userSection]);

	return (
		<>
			<MainContainerStyled userSection={userSection}>
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
