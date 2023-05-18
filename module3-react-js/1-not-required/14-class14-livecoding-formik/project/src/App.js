import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/shared/navbar/Navbar";
import GlobalStyles from "./global-styles/GlobalStyles";
import { Router } from "./router/Router";

function App() {
	const [extendNavbar, setExtendNavbar] = useState(false);

	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Navbar extendNavbar={extendNavbar} setExtendNavbar={setExtendNavbar} />
				{!extendNavbar && <Router />}
			</BrowserRouter>
		</>
	);
}

export default App;
