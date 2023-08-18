import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as categoriesActions from "../../../redux/categories/CategoriesActions";
import { BorderDecoration, CardCategory } from "./CategoriesStyles";

const Category = ({ img, title, category }) => {
	const selectedCategory = useSelector((state) => state.categories.selectedCategory);
	const dispatch = useDispatch();

	return (
		<CardCategory selected={category === selectedCategory} onClick={() => dispatch(categoriesActions.selectCategory(category))}>
			<img src={img} alt={title} />
			<h2>{title}</h2>
			<BorderDecoration></BorderDecoration>
		</CardCategory>
	);
};

export default Category;
