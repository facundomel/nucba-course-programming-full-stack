import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "../components/pages/user/login/Login";
import { useDispatch, useSelector } from "react-redux";
import Register from "../components/pages/user/register/Register";
import ForgotPassword from "../components/pages/user/forgot-password/ForgotPassword";
import PageNotFound from "../components/pages/page-not-found/PageNotFound";
import RecipeFavorite from "../components/pages/recipe/recipe-favorite/RecipeFavorite";
import CreateRecipe from "../components/pages/recipe/create-recipe/CreateRecipe";
import RecipeAll from "../components/pages/recipe/recipe-all/RecipeAll";
import RecipeService from "../service/RecipeService";
import * as recipesActions from "../redux/recipes/RecipesActions.js";

const Router = () => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Routes>
			<Route path="*" element={<PageNotFound />} />
			<Route path="/" element={<Navigate to="/recetas/1" />} />
			{/* <Route path="/recetas" element={<RecipeAll />} /> */}
			<Route path="/recetas/:page" element={<RecipeAll />} />
			<Route path="/registro" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/recuperar-password" element={<ForgotPassword />} />
			{currentUser && (
				<>
					<Route path="/recetas-favoritas" element={<RecipeFavorite />} />
					<Route path="/crear-receta" element={<CreateRecipe />} />
				</>
			)}
		</Routes>
	);
};

export default Router;
