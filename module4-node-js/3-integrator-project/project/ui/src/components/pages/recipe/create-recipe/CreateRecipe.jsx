import React, { useEffect, useRef, useState } from "react";
import Input from "../../../atomics/input/Input";
import Button from "../../../atomics/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import UserSession from "../../../../model/UserSession";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions.js";
import User from "../../../../model/User";
import { CreateRecipeContainer, CreateRecipeForm, TextAreaAndSmall } from "./CreateRecipeStyles";
import TextArea from "../../../atomics/text-area/TextArea";
import Recipe from "../../../../model/Recipe";
import { RecipeErrorType } from "../../../../model/enum/ErrorType";
import RecipeCategory from "../../../../model/RecipeCategory";
import RecipeCategoryService from "../../../../service/RecipeCategoryService";
import { SelectOptionStyled } from "../../../atomics/select/SelectStyles";
import SelectCustom from "../../../atomics/select/Select";
import { isValidSelectedRecipeCategory, isValidVariusFields } from "./CreateRecipeValidations";
import RecipeService from "../../../../service/RecipeService";
import * as categoriesActions from "../../../../redux/categories/CategoriesActions.js";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import Utils from "../../../../utils/Utils";

const CreateRecipe = () => {
	const [error, setError] = useState(null);
	const [valueInputs, setValueInputs] = useState(new Recipe());
	// const [recipesCategories, setRecipesCategories] = useState([new RecipeCategory()]);
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

	useEffect(() => {
		titleRef.current.focus();
		dispatch(userActions.setUserSection("CreateRecipe"));
		if (categories.length === 0) {
			handlerSetRecipesCategories();
		}
	}, []);

	useEffect(() => {
		if (!error) return;

		setError(null);
	}, [valueInputs]);

	const handlerSetRecipesCategories = async () => {
		try {
			const recipesCategories = await RecipeCategoryService.getRecipesCategory();
			dispatch(categoriesActions.setCategories(recipesCategories));
		} catch (error) {
			Utils.setSnackbarError(error, dispatch);
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
				setError
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
			dispatch(
				snackbarActions.setOptionsSnackbar({
					open: true,
					severity: "success",
					message: `¡Receta ${recipeCreated.title} creada correctamente!`,
					autoHideDuration: 2500,
				})
			);
		} catch (error) {
			Utils.setSnackbarError(error, dispatch);
		}

		// const user = localStorage.get(KEY_USER_SESSION) || null;

		// if (user != null && user.email == valueInputs.email) {
		// 	setError(new ErrorCustom(ERROR_EMAIL, "El email ya se encuentra en uso"));
		// 	emailRef.current.focus();
		// 	return;
		// }

		// localStorage.save(KEY_USER_SESSION, valueInputs);
	};

	return (
		<CreateRecipeContainer>
			<h1>Creá tu receta</h1>
			<CreateRecipeForm onSubmit={onSubmitCreateRecipe}>
				<Input
					name="title"
					type="text"
					placeholder="Título"
					inputRef={titleRef}
					handleOnChange={handleChangeInputs}
					error={error && error.type === RecipeErrorType.ERROR_TITLE && error}
				/>
				{/* <SelectCustom
					defaultValue="-1"
					name="recipesCategories"
					selectRef={selectRef}
					handleOnChange={handleChangeInputs}
					error={error && error.type === RecipeErrorType.ERROR_CATEGORIES && error}
				>
					<SelectOptionStyled value="-1" disabled hidden>
						- Seleccioná una opción -
					</SelectOptionStyled>
					{recipesCategories.map((value, index) => (
						<SelectOptionStyled key={index} value={value.id}>
							{value.title}
						</SelectOptionStyled>
					))}
				</SelectCustom> */}
				<SelectCustom
					name={"recipesCategory"}
					placeholder="Categoría"
					selectRef={recipesCategoryRef}
					options={categories.map((recipeCategory) => ({ value: recipeCategory.id, label: recipeCategory.title }))}
					handleOnChange={handleChangeSelectRecipeCategory}
					error={error && error.type === RecipeErrorType.ERROR_CATEGORIES && error}
				/>
				<Input
					name="urlImage"
					type="text"
					placeholder="URL de imagen"
					inputRef={urlImageRef}
					handleOnChange={handleChangeInputs}
					error={error && error.type === RecipeErrorType.ERROR_URL_IMAGE && error}
				/>
				<TextArea
					name="description"
					type="text"
					placeholder="Breve descripción"
					textAreaRef={descriptionRef}
					handleOnChange={handleChangeInputs}
					error={error && error.type === RecipeErrorType.ERROR_DESCRIPTION && error}
					rows={5}
				/>
				<TextAreaAndSmall>
					<TextArea
						name="ingredients"
						type="text"
						placeholder="Ingredientes"
						textAreaRef={ingredientsRef}
						handleOnChange={handleChangeInputs}
						error={error && error.type === RecipeErrorType.ERROR_INGREDIENTS && error}
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
						error={error && error.type === RecipeErrorType.ERROR_INSTRUCTIONS && error}
						rows={10}
					/>
					<small>Al final de cada paso debe presionar enter</small>
				</TextAreaAndSmall>
				<Button type="submit" width="100%">
					Crear Receta
				</Button>
			</CreateRecipeForm>
		</CreateRecipeContainer>
	);
};

export default CreateRecipe;
