import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesGridContainer } from "./CategoriesStyles";
import Category from "./Category";
import * as categoriesActions from "../../../redux/categories/CategoriesActions.js";

const Categories = () => {
	const categories = useSelector((state) => state.categories.categories);
	const { recipesAll, recipeSection } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(categoriesActions.selectCategory(null));
	}, []);

	return (
		<>
			{((recipeSection == "MyRecipes" && recipesAll.filter((recipe) => recipe.isFavorite).length > 0) ||
				(recipeSection == "Home" && recipesAll.length > 0)) && (
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
