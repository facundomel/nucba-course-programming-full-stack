export const SET_RECIPES_ALL = "SET_RECIPES_ALL";
export const SET_RECIPES_FILTERED = "SET_RECIPES_FILTERED";
export const SET_RECIPE_FAVORITE = "SET_RECIPE_FAVORITE";

export const setRecipesAll = (recipes: any) => ({
	type: SET_RECIPES_ALL,
	payload: recipes,
});

export const setRecipesFiltered = (recipes: any) => ({
	type: SET_RECIPES_FILTERED,
	payload: recipes,
});

export const setRecipeFavorite = (recipes: any) => ({
	type: SET_RECIPE_FAVORITE,
	payload: recipes,
});
