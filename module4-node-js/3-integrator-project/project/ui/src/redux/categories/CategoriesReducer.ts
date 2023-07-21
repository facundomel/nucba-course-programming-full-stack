import { Categories } from "../../assets/data/DataCategories";
import { SELECT_CATEGORY } from "./CategoriesActions";

const INITIAL_STATE = {
	categories: Categories,
	selectedCategory: null,
};

const categoriesReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
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
