import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../components/home/Home";
import { MainPokeAPI } from "../components/poke-api/main-poke-api/MainPokeAPI";
import { Error404 } from "../components/shared/comp/error-404/Error404";
import { MainTodoList } from "../components/todo-list/main-todo-list/MainTodoList";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="todo-list" element={<MainTodoList />} />
			<Route path="poke-api" element={<MainPokeAPI />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};
