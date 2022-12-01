import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import GlobalStyles from "./global-styles/GlobalStyles";
import { Router } from "./router/Router";

function App() {
	const [extendNavbar, setExtendNavbar] = useState(false);

	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Navbar extendNavbar={extendNavbar} setExtendNavbar={setExtendNavbar} />
				<Router />
			</BrowserRouter>
		</>
	);
}

export default App;
