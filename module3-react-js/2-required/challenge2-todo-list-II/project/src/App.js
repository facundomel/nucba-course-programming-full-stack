import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/shared/comp/navbar/Navbar";
import { PokeAPIProvider } from "./contexts/PokeAPIContext";
import { TodoListProvider } from "./contexts/TodoListContext";
import GlobalStyles from "./global-styles/GlobalStyles";
import { Router } from "./router/Router";

function App() {
	const [extendNavbar, setExtendNavbar] = useState(false);

	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<TodoListProvider>
					<PokeAPIProvider>
						<Navbar extendNavbar={extendNavbar} setExtendNavbar={setExtendNavbar} />
						{!extendNavbar && <Router />}
					</PokeAPIProvider>
				</TodoListProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
