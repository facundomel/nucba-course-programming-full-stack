import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/pages/home/Home";
import { NotFound } from "../components/pages/not-found/NotFound";
import { MyRecipes } from "../components/pages/my-recipes/MyRecipes";
import { Login } from "../components/pages/login/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";

export const Router = () => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{currentUser && <Route path="mis-recetas" element={<MyRecipes />} />}
			<Route path="login" element={<Login />}></Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
