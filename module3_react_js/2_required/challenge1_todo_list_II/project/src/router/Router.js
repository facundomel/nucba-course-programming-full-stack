import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Error404 } from "../components/error-404/Error404";
import { MainPokeAPI } from "../components/poke-api/main-poke-api/MainPokeAPI";
import { MainTodoList } from "../components/todo-list/main-todo-list/MainTodoList";
import { PokeAPIProvider } from "../contexts/PokeAPIContext";
import { TodoListProvider } from "../contexts/TodoListContext";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={"todo-list"} />} />
			<Route
				path="todo-list"
				element={
					<TodoListProvider>
						<MainTodoList />
					</TodoListProvider>
				}
			/>
			<Route
				path="poke-api"
				element={
					<PokeAPIProvider>
						<MainPokeAPI />
					</PokeAPIProvider>
				}
			/>
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};
