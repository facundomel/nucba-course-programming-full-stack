import React from "react";
import { useSelector } from "react-redux";
import { CategoriesContainer } from "./CategoriesStyles";
import Category from "./Category";

const Categories = () => {
	const categories = useSelector((state) => state.categories.categories);

	return (
		<CategoriesContainer>
			{categories.map((category) => (
				<Category key={category.id} {...category} />
			))}
		</CategoriesContainer>
	);
};

export default Categories;
