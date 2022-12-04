import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
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
					<Navbar extendNavbar={extendNavbar} setExtendNavbar={setExtendNavbar} />
					<Router />
				</TodoListProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
