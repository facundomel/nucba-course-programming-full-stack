import React, { useState } from "react";
import { Navbar } from "../navbar/Navbar";
import { MainStyled } from "./MainStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../home/Home";
import { Product } from "../product/Product";
import { Contact } from "../contact/Contact";
import { About } from "../about/About";
import { Error404 } from "../error-404/Error404";

export const Main = () => {
	const [extendNavbar, setExtendNavbar] = useState(false);

	return (
		<>
			<MainStyled>
				<BrowserRouter>
					<Navbar extendNavbar={extendNavbar} setExtendNavbar={setExtendNavbar} />
					<Routes>
						<Route path="/" element={!extendNavbar ? <Home /> : ""} />
						<Route path="/productos" element={!extendNavbar ? <Product /> : ""} />
						<Route path="/contacto" element={!extendNavbar ? <Contact /> : ""} />
						<Route path="/sobre-nosotros" element={!extendNavbar ? <About /> : ""} />
						<Route path="*" element={!extendNavbar ? <Error404 /> : ""} />
					</Routes>
				</BrowserRouter>
			</MainStyled>
		</>
	);
};
