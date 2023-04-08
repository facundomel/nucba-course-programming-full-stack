import { SET_RECIPE_FAVORITE, SET_RECIPES_FILTERED, SET_RECIPES_ALL, SET_RECIPE_SECTION } from "./RecipesActions";

const INITIAL_STATE = {
	recipesAll: [],
	recipesFiltered: [],
	recipeSection: "Home",
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

		case SET_RECIPE_SECTION:
			return {
				...state,
				recipeSection: action.payload,
			};

		default:
			return state;
	}
};

export default recipesReducer;
