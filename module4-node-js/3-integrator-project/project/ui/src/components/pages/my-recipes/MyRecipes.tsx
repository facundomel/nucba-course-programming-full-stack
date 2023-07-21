import { useEffect } from "react";
import Hero from "../../no-atomics/hero/Hero";
import Recipes from "../../no-atomics/recipes/Recipes";
import { MyRecipesContainer } from "./MyRecipesStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../redux/user/UserActions";
import Categories from "../../no-atomics/recipes-category/Categories";

const MyRecipes = () => {
	const { recipesAll } = useSelector((state) => (state as any).recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.setUserSection("MyRecipes"));
	}, []);

	return (
		<>
			<MyRecipesContainer>
				<Hero recipesToFilter={recipesAll.filter((recipe: any) => recipe.isFavorite)} />
				<Categories />
				<Recipes />
			</MyRecipesContainer>
		</>
	);
};

export default MyRecipes;
