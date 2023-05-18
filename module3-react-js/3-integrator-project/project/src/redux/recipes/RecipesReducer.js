import { SET_RECIPE_FAVORITE, SET_RECIPES_FILTERED, SET_RECIPES_ALL } from "./RecipesActions";
import localStorage, { KEY_RECIPES_ALL } from "../../repository/LocalStorage";
import DataRecipes from "../../assets/data/DataRecipes";

const INITIAL_STATE = {
	recipesAll: localStorage.get(KEY_RECIPES_ALL) || DataRecipes.getData(),
	recipesFiltered: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_RECIPES_ALL:
			return {
				...state,
				recipesAll: action.payload,
			};

		case SET_RECIPES_FILTERED:
			return {
				...state,
				recipesFiltered: action.payload,
			};

		case SET_RECIPE_FAVORITE:
			return {
				...state,
				recipesAll: action.payload.map((recipe) => recipe),
			};

		default:
			return state;
	}
};

export default recipesReducer;
