import React from "react";
import { Routes, Route } from "react-router-dom";
import AllRecipe from "../components/pages/recipe/all-recipe/AllRecipe";
import Login from "../components/pages/user/login/Login";
import { useSelector } from "react-redux";
import Register from "../components/pages/user/register/Register";
import ForgotPassword from "../components/pages/user/forgot-password/ForgotPassword";
import PageNotFound from "../components/pages/page-not-found/PageNotFound";
import RecipeFavorite from "../components/pages/recipe/recipe-favorite/RecipeFavorite";
import CreateRecipe from "../components/pages/recipe/create-recipe/CreateRecipe";

const Router = () => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Routes>
			<Route path="/" element={<AllRecipe />} />
			{currentUser && <Route path="mis-recetas" element={<RecipeFavorite />} />}
			<Route path="registro" element={<Register />} />
			<Route path="login" element={<Login />} />
			<Route path="recuperar-password" element={<ForgotPassword />} />
			<Route path="crear-receta" element={<CreateRecipe />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default Router;
