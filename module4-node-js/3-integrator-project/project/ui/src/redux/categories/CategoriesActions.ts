export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const selectCategory = (category: any) => ({
	type: SELECT_CATEGORY,
	payload: category,
});
