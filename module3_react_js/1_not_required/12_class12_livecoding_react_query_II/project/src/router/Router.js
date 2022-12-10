import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main as MainPokemon } from "../components/pokemon/main/Main";
import { Error404 } from "../components/shared/comp/error-404/Error404";
import { Main as MainTodoList } from "../components/todo-list/main/Main";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={"todo-list"} />} />
			<Route path="todo-list" element={<MainTodoList />} />
			<Route path="pokemon" element={<MainPokemon />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};
