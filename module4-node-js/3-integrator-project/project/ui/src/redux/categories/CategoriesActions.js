export const CATEGORIES = "CATEGORIES"
export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const setCategories = (categories) => ({
	type: CATEGORIES,
	payload: categories,
});

export const selectCategory = (category) => ({
	type: SELECT_CATEGORY,
	payload: category,
});
