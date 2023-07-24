import { CATEGORIES, SELECT_CATEGORY } from "./CategoriesActions";

const INITIAL_STATE = {
	categories: [],
	selectedCategory: null,
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case SELECT_CATEGORY:
			return {
				...state,
				selectedCategory: action.payload !== state.selectedCategory ? action.payload : null,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
