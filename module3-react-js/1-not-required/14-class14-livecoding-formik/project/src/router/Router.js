import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Error404 } from "../components/shared/error-404/Error404";
import { MainForm } from "../components/user-register/main/MainForm";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="registro" element={<MainForm />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};
