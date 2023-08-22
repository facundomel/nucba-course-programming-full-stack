import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesGridContainer, SelectCategoriesContainer } from "./CategoriesStyles";
import Category from "./Category";
import * as categoriesActions from "../../../redux/categories/CategoriesActions.js";
import RecipeCategoryService from "../../../service/RecipeCategoryService";
import SnackbarUtils from "../../../utils/SnackbarUtils";
import { RecipePageSection } from "../../../model/enum/PageSection";
import SelectCustom from "../../atomics/select/Select";

const Categories = () => {
	const categories = useSelector((state) => state.categories.categories);
	const categoriesSelect = [{ id: -1, title: "Ninguna", category: "none" }, ...categories];
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const recipesCategoriesRef = useRef();

	useEffect(() => {
		handlerSetCategories();
		dispatch(categoriesActions.selectCategory(null));
	}, []);

	const handlerSetCategories = async () => {
		try {
			const recipesCategories = await RecipeCategoryService.getRecipesCategories();
			dispatch(categoriesActions.setCategories(recipesCategories));
		} catch (err) {
			console.log(err);
			SnackbarUtils.error(err, 2500, dispatch);
		}
	};

	const handleChangeSelectRecipeCategory = (selectedOption) => {
		if (selectedOption.category === "none") {
			dispatch(categoriesActions.selectCategory(null));
		} else {
			dispatch(categoriesActions.selectCategory(selectedOption.category));
		}
	};

	return (
		<>
			{((userSection === RecipePageSection.RecipeFavorite && recipesFavorite.length > 0) ||
				(userSection === RecipePageSection.RecipeAll && recipesAll.length > 0)) && (
				<>
					<CategoriesGridContainer>
						{categories.map((category) => (
							<Category key={category.id} {...category} />
						))}
					</CategoriesGridContainer>
					<SelectCategoriesContainer>
						<SelectCustom
							name={"recipesCategories"}
							placeholder="Categoría"
							selectRef={recipesCategoriesRef}
							options={categoriesSelect.map((recipeCategory) => ({
								value: recipeCategory.id,
								label: recipeCategory.title,
								category: recipeCategory.category,
							}))}
							handleOnChange={handleChangeSelectRecipeCategory}
						/>
					</SelectCategoriesContainer>
				</>
			)}
		</>
	);
};

export default Categories;
