import React from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "../components/no-atomics/footer/Footer";
import Hero from "../components/no-atomics/hero/Hero";
import { Navbar } from "../components/no-atomics/navbar/Navbar";
import { MainContainerStyled } from "./MainStyles";
import { Router } from "./Router";

export const Main = () => {
	const [extendNavbar, setExtendNavbar] = useState(false);

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
