import React, { useEffect, useState } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { RecipeAllContainer } from "./RecipeAllStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import RecipeService from "../../../../service/RecipeService";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import { useNavigate, useParams } from "react-router-dom";
import PaginationCustom from "../../../no-atomics/pagination/PaginationCustom";

const RecipeAll = () => {
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const { page } = useParams();
	const [currentPage, setCurrentPage] = useState(Number(page) || 1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		dispatch(userActions.setUserSection("RecipeAll"));
	}, []);

	useEffect(() => {
		handlerSetRecipesAll();
	}, [currentPage]);

	const handlerSetRecipesAll = async () => {
		try {
			const limit = 6;
			const offset = (currentPage - 1) * limit;

			// if (!recipesAll.length) {
			const { recipes, paging } = await RecipeService.getRecipes(offset, limit);
			dispatch(recipesActions.setRecipesAll(recipes));
			setTotalPages(Math.ceil(paging.total / limit));
			// }

			if (currentUser) {
				const recipesFavorite = await RecipeService.getRecipesFavoriteWithDetailsByUserId(currentUser, navigate, dispatch);
				dispatch(recipesActions.setRecipesFavorite(recipesFavorite));
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<>
			<RecipeAllContainer>
				{loading ? (
					<p>Cargando todas las recetas...</p>
				) : (
					<>
						<Hero />
						<Categories />
						<Recipes />
					</>
				)}
				{<PaginationCustom currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
			</RecipeAllContainer>
		</>
	);
};

export default RecipeAll;
