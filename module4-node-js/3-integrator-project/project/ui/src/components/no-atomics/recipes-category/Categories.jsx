import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesGridContainer } from "./CategoriesStyles";
import Category from "./Category";
import * as categoriesActions from "../../../redux/categories/CategoriesActions.js";
import RecipeCategoryService from "../../../service/RecipeCategoryService";
import Utils from "../../../utils/Utils";

const Categories = () => {
	const categories = useSelector((state) => state.categories.categories);
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		handlerSetCategories();
		dispatch(categoriesActions.selectCategory(null));
	}, []);

	const handlerSetCategories = async () => {
		try {
			const categories = await RecipeCategoryService.getRecipesCategory();
			dispatch(categoriesActions.setCategories(categories));
		} catch (err) {
			Utils.setSnackbarError(err, dispatch);
		}
	};

	return (
		<>
			{((userSection === "RecipeFavorite" && recipesFavorite.length > 0) || (userSection === "RecipeAll" && recipesAll.length > 0)) && (
				<CategoriesGridContainer>
					{categories.map((category) => (
						<Category key={category.id} {...category} />
					))}
				</CategoriesGridContainer>
			)}
		</>
	);
};

export default Categories;
