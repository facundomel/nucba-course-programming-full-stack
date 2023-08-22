import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/pages/user/login/Login";
import { useSelector } from "react-redux";
import Register from "../components/pages/user/register/Register";
import ForgotPassword from "../components/pages/user/forgot-password/ForgotPassword";
import RecipeFavorite from "../components/pages/recipe/recipe-favorite/RecipeFavorite";
import CreateRecipe from "../components/pages/recipe/create-recipe/CreateRecipe";
import RecipeAll from "../components/pages/recipe/recipe-all/RecipeAll";
import { HttpStatusCode } from "axios";
import Config from "../config/Config";
import NewPassword from "../components/pages/user/forgot-password/NewPassword";
import ErrorCustom from "../components/no-atomics/error/ErrorCustom";

const Router = () => {
	const { currentUser, userForgotPassword } = useSelector((state) => state.user);

	try {
		Config.validateEnvironmentVariables();

		return (
			<Routes>
				<Route path="*" element={<ErrorCustom statusCode={HttpStatusCode.NotFound} />} />
				<Route path="/" element={<Navigate to="/recetas/1" />} />
				<Route path="/recetas" element={<Navigate to="/recetas/1" />} />
				<Route path="/recetas/:page" element={<RecipeAll />} />
				<Route path="/registro" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/restablecer-contraseña" element={<ForgotPassword />} />
				{userForgotPassword && <Route path="/nueva-contraseña" element={<NewPassword />} />}
				{currentUser && (
					<>
						<Route path="/recetas-favoritas" element={<Navigate to="/recetas-favoritas/1" />} />
						<Route path="/recetas-favoritas/:page" element={<RecipeFavorite />} />
						<Route path="/crear-receta" element={<CreateRecipe />} />
					</>
				)}
			</Routes>
		);
	} catch (error) {
		return <ErrorCustom statusCode={HttpStatusCode.InternalServerError} />;
	}
};

export default Router;
