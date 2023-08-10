import CustomException from "../../../../model/CustomException";
import { RecipeErrorType } from "../../../../model/enum/ErrorType";

export const isValidVariusFields = (
	title,
	selectedRecipeCategory,
	urlImage,
	ingredients,
	instructions,
	titleRef,
	recipesCategoryRef,
	urlImageRef,
	ingredientsRef,
	instructionsRef,
	setError
) => {
	if (title === "") {
		console.log("object");
		setError(new CustomException(RecipeErrorType.ERROR_TITLE, "Campo requerido"));
		titleRef.current.focus();
		return false;
	}
	if (selectedRecipeCategory === -1) {
		setError(new CustomException(RecipeErrorType.ERROR_CATEGORIES, "Campo requerido"));
		recipesCategoryRef.current.focus();
		return false;
	}
	if (urlImage === "") {
		setError(new CustomException(RecipeErrorType.ERROR_URL_IMAGE, "Campo requerido"));
		urlImageRef.current.focus();
		return false;
	}
	if (ingredients === "") {
		setError(new CustomException(RecipeErrorType.ERROR_INGREDIENTS, "Campo requerido"));
		ingredientsRef.current.focus();
		return false;
	}
	if (instructions === "") {
		setError(new CustomException(RecipeErrorType.ERROR_INSTRUCTIONS, "Campo requerido"));
		instructionsRef.current.focus();
		return false;
	}
	return true;
};