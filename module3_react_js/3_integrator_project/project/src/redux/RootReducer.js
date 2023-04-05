import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import recipesReducer from "./recipes/RecipesReducer";
// import cartReducer from "./cart/cart-reducer";
// import categoriesReducer from "./categories/categories-reducer";
// import ordersReducer from "./orders/orders-reducer";
// import productsReducer from "./products/products-reducer";
// import recommendedReducer from "./recommended/recommended-reducer";
import userReducer from "./user/UserReducer";

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["user"],
};

const rootReducer = combineReducers({
	// products: productsReducer,
	// categories: categoriesReducer,
	// recommended: recommendedReducer,
	// cart: cartReducer,
	user: userReducer,
	recipes: recipesReducer,
});

export default persistReducer(persistConfig, rootReducer);
