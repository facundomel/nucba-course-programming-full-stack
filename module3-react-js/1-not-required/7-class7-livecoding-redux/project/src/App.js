import { Provider } from "react-redux";
import { Home } from "./components/comp/home/Home";
import store from "./components/redux/store";
import { GlobalStyles } from "./global-styles/GlobalStyles";

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
