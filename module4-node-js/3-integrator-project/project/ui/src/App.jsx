import GlobalStyles from "./global-styles/GlobalStyles";
import Main from "./main/Main";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/Store";
import React from "react";
import CustomException from "./model/CustomException";
import { HttpStatusCode } from "axios";

const App = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	if (!BASE_URL) {
		throw new CustomException("", "Error", HttpStatusCode.InternalServerError);
	}
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
};

export default App;
