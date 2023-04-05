import GlobalStyles from "./global-styles/GlobalStyles";
import { Main } from "./main/Main";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/Store";

function App() {
	return (
		<>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<GlobalStyles />
					<Main />
				</PersistGate>
			</Provider>
		</>
	);
}

export default App;