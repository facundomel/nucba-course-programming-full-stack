import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoriesReducer from "./categories/CategoriesReducer";
import recipesReducer from "./recipes/RecipesReducer";
import userReducer from "./user/UserReducer";

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["user"],
};

const rootReducer = combineReducers({
	user: userReducer,
	recipes: recipesReducer,
	categories: categoriesReducer,
});

export default persistReducer(persistConfig, rootReducer);
