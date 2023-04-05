import DataRecipes from "../../assets/data/DataRecipes";
import { SET_RECIPES_FILTERED } from "./RecipesActions";

const INITIAL_STATE = {
	// recipesSection: [],
	recipesFiltered: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// case SET_RECIPES_SECTION:
		// 	return {
		// 		...state,
		// 		recipesSection: action.payload,
		// 	};

		case SET_RECIPES_FILTERED:
			return {
				...state,
				recipesFiltered: action.payload,
			};

		default:
			return state;
	}
};

export default recipesReducer;
