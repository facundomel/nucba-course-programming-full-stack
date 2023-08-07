import React, { useEffect, useState } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import { RecipeFavoriteContainer } from "./RecipeFavoriteStyles";
import RecipeService from "../../../../service/RecipeService";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import { useNavigate, useParams } from "react-router-dom";
import PaginationCustom from "../../../no-atomics/pagination/PaginationCustom";
import { FcRating } from "react-icons/fc";

const RecipeFavorite = () => {
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { currentUser, userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const { page } = useParams();
	const [currentPage, setCurrentPage] = useState(Number(page) || 1);
	const [totalPages, setTotalPages] = useState(1);
	const limitRecipes = 12;
	const offsetRecipes = (currentPage - 1) * limitRecipes;

	useEffect(() => {
		dispatch(userActions.setUserSection("RecipeFavorite"));
	}, []);

	useEffect(() => {
		handlerSetRecipesFavorite();
	}, [currentPage]);

	const handlerSetRecipesFavorite = async () => {
		try {
			if (currentUser) {
				if (currentPage > totalPages) {
					setCurrentPage(1);
				}

				const { recipes, paging } = await RecipeService.getRecipesFavoriteWithDetailsByUserId(
					currentUser,
					navigate,
					dispatch,
					offsetRecipes,
					limitRecipes
				);
				dispatch(recipesActions.setRecipesFavorite(recipes));
				setTotalPages(Math.ceil(paging.total / limitRecipes));
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<>
			<RecipeFavoriteContainer>
				{loading ? (
					<p>Cargando todas las recetas...</p>
				) : (
					<>
						<h1>Mis recetas <FcRating /></h1>
						<Hero />
						<Categories />
						<Recipes />
					</>
				)}
				{recipesFavorite.length > 0 && totalPages > 1 && (
					<PaginationCustom
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
						pathNavigate={"/recetas-favoritas"}
					/>
				)}
			</RecipeFavoriteContainer>
		</>
	);
};

export default RecipeFavorite;
