import React from "react";
import { Routes, Route } from "react-router-dom";
import { Error404 } from "../components/error-404/Error404";
import { MainPokeAPI } from "../components/poke-api/main-poke-api/MainPokeAPI";
import { MainTodoList } from "../components/todo-list/main-todo-list/MainTodoList";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<MainTodoList />} />
			<Route path="poke-api" element={<MainPokeAPI />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};
