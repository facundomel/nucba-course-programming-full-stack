import { RecipePageSection } from "../../model/enum/PageSection";
import { SET_PAGE_SECTION } from "./PageSectionActions";

const INITIAL_STATE = {
	pageSection: RecipePageSection.RecipeAll,
};

const pageSectionReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_PAGE_SECTION:
			return {
				...state,
				pageSection: action.payload,
			};

		default:
			return state;
	}
};

export default pageSectionReducer;
