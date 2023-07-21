import { useDispatch, useSelector } from "react-redux";
import * as categoriesActions from "../../../redux/categories/CategoriesActions";
import { BorderDecoration, CardCategory } from "./CategoriesStyles";

interface CategoryProps {
	img: string;
	title: string;
	category: string;
}

const Category = ({ img, title, category }: CategoryProps) => {
	const selectedCategory = useSelector((state) => (state as any).categories.selectedCategory);
	const dispatch = useDispatch();

	return (
		<CardCategory selected={category === selectedCategory} onClick={() => dispatch(categoriesActions.selectCategory(category))}>
			<img src={img} alt={category} />
			<h2>{title}</h2>
			<BorderDecoration></BorderDecoration>
		</CardCategory>
	);
};

export default Category;
