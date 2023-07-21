import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesGridContainer } from "./CategoriesStyles";
import Category from "./Category";
import * as categoriesActions from "../../../redux/categories/CategoriesActions";

const Categories = () => {
	const categories = useSelector((state) => (state as any).categories.categories);
	const { recipesAll } = useSelector((state) => (state as any).recipes);
	const { userSection } = useSelector((state) => (state as any).user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(categoriesActions.selectCategory(null));
	}, []);

	return (
		<>
			{((userSection == "MyRecipes" && recipesAll.filter((recipe: any) => recipe.isFavorite).length > 0) ||
				(userSection == "Home" && recipesAll.length > 0)) && (
				<CategoriesGridContainer>
					{categories.map((category: any) => (
						<Category key={category.id} {...category} />
					))}
				</CategoriesGridContainer>
			)}
		</>
	);
};

export default Categories;
