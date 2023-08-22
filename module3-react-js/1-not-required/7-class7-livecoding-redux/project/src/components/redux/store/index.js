import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
	reducer,
	composeWithDevTools,
});

store.subscribe(() => console.log("Cambió el estado"));

export default store;
