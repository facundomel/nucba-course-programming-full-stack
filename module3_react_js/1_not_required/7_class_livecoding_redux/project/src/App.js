import { GlobalStyles } from "./global-styles/GlobalStyles";
import { Home } from "./components/comp/Home/index";
import { Provider } from "react-redux";
import store from "./components/redux/store";

function App() {
	return (
		<>
			<GlobalStyles />
			<Provider store={store}>
				<Home />
			</Provider>
		</>
	);
}

export default App;
