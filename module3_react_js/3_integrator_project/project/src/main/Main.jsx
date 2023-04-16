import React from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "../components/no-atomics/footer/Footer";
import { Navbar } from "../components/no-atomics/navbar/Navbar";
import { MainContainerStyled } from "./MainStyles";
import { Router } from "./Router";
import localStorage, { KEY_RECIPES_ALL } from "../repository/LocalStorage.js";
import DataRecipes from "../assets/data/DataRecipes";
import { useDispatch } from "react-redux";
import * as recipesActions from "../redux/recipes/RecipesActions.js";

export const Main = () => {
	const [extendNavbar, setExtendNavbar] = useState(false);
	const dispatch = useDispatch();

	if (!localStorage.get(KEY_RECIPES_ALL)) {
		localStorage.save(KEY_RECIPES_ALL, DataRecipes.getData());
	}

	dispatch(recipesActions.setRecipesAll(localStorage.get(KEY_RECIPES_ALL) || []));

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
