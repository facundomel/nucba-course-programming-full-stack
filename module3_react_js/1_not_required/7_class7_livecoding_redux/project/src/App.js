import { GlobalStyles } from "./components/global-styles/GlobalStyles";
import { Home } from "./components/comp/home/Home";
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
