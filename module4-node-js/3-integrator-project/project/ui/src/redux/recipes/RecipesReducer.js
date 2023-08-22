import { SET_RECIPE_FAVORITE, SET_RECIPES_FILTERED, SET_RECIPES_ALL } from "./RecipesActions";

const INITIAL_STATE = {
	recipesAll: [],
	recipesFavorite: [],
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
				recipesFavorite: action.payload,
			};

		default:
			return state;
	}
};

export default recipesReducer;
