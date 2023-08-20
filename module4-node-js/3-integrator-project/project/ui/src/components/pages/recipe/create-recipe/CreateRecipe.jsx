import React, { useEffect, useRef, useState } from "react";
import Input from "../../../atomics/input/Input";
import Button from "../../../atomics/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions.js";
import { CreateRecipeContainer, CreateRecipeForm, TextAreaAndSmall } from "./CreateRecipeStyles";
import TextArea from "../../../atomics/text-area/TextArea";
import Recipe from "../../../../model/Recipe";
import { RecipeErrorType } from "../../../../model/enum/ErrorType";
import RecipeCategoryService from "../../../../service/RecipeCategoryService";
import SelectCustom from "../../../atomics/select/Select";
import { isValidVariusFields } from "./CreateRecipeValidations";
import RecipeService from "../../../../service/RecipeService";
import * as categoriesActions from "../../../../redux/categories/CategoriesActions.js";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import { RecipePageSection } from "../../../../model/enum/PageSection";

const CreateRecipe = () => {
	const [errorInput, setErrorInput] = useState(null);
	const [otherError, setOtherError] = useState(null);
	const [valueInputs, setValueInputs] = useState(new Recipe());
	const [selectedOptionRecipeCategory, setSelectedOptionRecipeCategory] = useState({ value: -1, label: "default" });
	const titleRef = useRef();
	const descriptionRef = useRef();
	const urlImageRef = useRef();
	const ingredientsRef = useRef();
	const instructionsRef = useRef();
	const recipesCategoryRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const { categories } = useSelector((state) => state.categories);
	const { recipesAll } = useSelector((state) => state.recipes);
	const { optionsSnackbar } = useSelector((state) => state.snackbar);

	useEffect(() => {
		titleRef.current.focus();
		dispatch(userActions.setUserSection(RecipePageSection.RecipeCreate));
		if (categories.length === 0) {
			handlerSetRecipesCategories();
		}
	}, []);

	useEffect(() => {
		if (!errorInput) return;

		setErrorInput(null);
	}, [valueInputs]);

	const handlerSetRecipesCategories = async () => {
		try {
			const recipesCategories = await RecipeCategoryService.getRecipesCategories();
			dispatch(categoriesActions.setCategories(recipesCategories));
		} catch (error) {
			setOtherError(error);
			SnackbarUtils.error(error, 2500, dispatch);
		}
	};

	const handleChangeInputs = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setValueInputs({ ...valueInputs, [name]: value });
	};

	const handleChangeSelectRecipeCategory = (selectedOption) => {
		setSelectedOptionRecipeCategory(selectedOption);
	};

	const onSubmitCreateRecipe = async (e) => {
		e.preventDefault();

		if (
			!isValidVariusFields(
				valueInputs.title,
				selectedOptionRecipeCategory.value,
				valueInputs.urlImage,
				valueInputs.ingredients,
				valueInputs.instructions,
				titleRef,
				recipesCategoryRef,
				urlImageRef,
				ingredientsRef,
				instructionsRef,
				setErrorInput
			)
		)
			return;

		try {
			valueInputs.userId = currentUser.user.id;
			valueInputs.categoryId = selectedOptionRecipeCategory.value;
			let recipeCreated = await RecipeService.createRecipe(valueInputs, currentUser.authToken, navigate, dispatch);
			recipeCreated = await RecipeService.getRecipeById(recipeCreated.id, currentUser.authToken, navigate, dispatch);
			dispatch(recipesActions.setRecipesAll([...recipesAll, recipeCreated]));
			navigate("/recetas/1");
			SnackbarUtils.success(`¡Receta ${recipeCreated.title} creada correctamente!`, 2500, dispatch);
		} catch (error) {
			setOtherError(error);
			SnackbarUtils.error(error, 2500, dispatch);
		}
	};

	return (
		<>
			<CreateRecipeContainer>
				<h1>Creá tu receta</h1>
				<CreateRecipeForm onSubmit={onSubmitCreateRecipe}>
					<Input
						name="title"
						type="text"
						placeholder="Título"
						inputRef={titleRef}
						handleOnChange={handleChangeInputs}
						error={errorInput && errorInput.type === RecipeErrorType.ERROR_TITLE && errorInput}
					/>
					<SelectCustom
						name={"recipesCategory"}
						placeholder="Categoría"
						selectRef={recipesCategoryRef}
						options={categories.map((recipeCategory) => ({ value: recipeCategory.id, label: recipeCategory.title }))}
						handleOnChange={handleChangeSelectRecipeCategory}
						error={errorInput && errorInput.type === RecipeErrorType.ERROR_CATEGORIES && errorInput}
					/>
					<Input
						name="urlImage"
						type="text"
						placeholder="URL de imagen"
						inputRef={urlImageRef}
						handleOnChange={handleChangeInputs}
						error={errorInput && errorInput.type === RecipeErrorType.ERROR_URL_IMAGE && errorInput}
					/>
					<TextArea
						name="description"
						type="text"
						placeholder="Breve descripción"
						textAreaRef={descriptionRef}
						handleOnChange={handleChangeInputs}
						error={errorInput && errorInput.type === RecipeErrorType.ERROR_DESCRIPTION && errorInput}
						rows={5}
					/>
					<TextAreaAndSmall>
						<TextArea
							name="ingredients"
							type="text"
							placeholder="Ingredientes"
							textAreaRef={ingredientsRef}
							handleOnChange={handleChangeInputs}
							error={errorInput && errorInput.type === RecipeErrorType.ERROR_INGREDIENTS && errorInput}
							rows={10}
						/>
						<small>Al final de cada ingrediente debe presionar enter</small>
					</TextAreaAndSmall>
					<TextAreaAndSmall>
						<TextArea
							name="instructions"
							type="text"
							placeholder="Instrucciones"
							textAreaRef={instructionsRef}
							handleOnChange={handleChangeInputs}
							error={errorInput && errorInput.type === RecipeErrorType.ERROR_INSTRUCTIONS && errorInput}
							rows={10}
						/>
						<small>Al final de cada paso debe presionar enter</small>
					</TextAreaAndSmall>
					<Button type="submit" width="100%">
						Crear Receta
					</Button>
				</CreateRecipeForm>
			</CreateRecipeContainer>

			{otherError && (
				<SnackbarCustom
					open={optionsSnackbar.open}
					onClose={() => dispatch(snackbarActions.setOptionsSnackbar({ ...optionsSnackbar, open: false }))}
					severity={optionsSnackbar.severity}
					message={optionsSnackbar.message}
					autoHideDuration={optionsSnackbar.autoHideDuration}
				/>
			)}
		</>
	);
};

export default CreateRecipe;
