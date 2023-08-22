import { combineReducers } from "redux";
import { cartReducer } from "./CartReducer";

export const reducer = combineReducers({
	cart: cartReducer,
});
