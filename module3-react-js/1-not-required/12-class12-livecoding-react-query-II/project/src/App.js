import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/shared/comp/navbar/Navbar";
import { PokemonProvider } from "./contexts/PokemonContext";
import { TodoListProvider } from "./contexts/TodoListContext";
import GlobalStyles from "./global-styles/GlobalStyles";
import { Router } from "./router/Router";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
	const [extendNavbar, setExtendNavbar] = useState(false);
	const queryClient = new QueryClient();

	return (
		<>
			<GlobalStyles />
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<TodoListProvider>
						<PokemonProvider>
							<Navbar extendNavbar={extendNavbar} setExtendNavbar={setExtendNavbar} />
							{!extendNavbar && <Router />}
						</PokemonProvider>
					</TodoListProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
