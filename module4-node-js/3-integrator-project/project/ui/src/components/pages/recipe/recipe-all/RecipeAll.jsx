import React, { useEffect, useState } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { CircularProgressCustom, RecipeAllContainer, RecipeAllTitle } from "./RecipeAllStyles";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import RecipeService from "../../../../service/RecipeService";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import { useNavigate, useParams } from "react-router-dom";
import PaginationCustom from "../../../no-atomics/pagination/PaginationCustom";
import * as snackbarActions from "../../../../redux/snackbar/SnackbarActions.js";
import SnackbarCustom from "../../../no-atomics/snackbar/SnackbarCustom";
import { FcReading } from "react-icons/fc";
import { CircularProgress, LinearProgress } from "@mui/material";
import { CircularProgressContainer } from "../../../atomics/spinner/SpinnerStyles";
import { Spinner } from "../../../atomics/spinner/Spinner";

const RecipeAll = () => {
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const { page } = useParams();
	const [currentPage, setCurrentPage] = useState(Number(page) || 1);
	const [totalPages, setTotalPages] = useState(1);
	const limitRecipes = 12;
	const offsetRecipes = (currentPage - 1) * limitRecipes;
	const { optionsSnackbar } = useSelector((state) => state.snackbar);

	useEffect(() => {
		dispatch(userActions.setUserSection("RecipeAll"));
	}, []);

	useEffect(() => {
		handlerSetRecipesAll();
		handlerSetRecipesFavorite();
	}, [currentPage]);

	const handlerSetRecipesAll = async () => {
		try {
			setLoading(true);
			// if (!recipesAll.length) {

			if (currentPage > totalPages) {
				setCurrentPage(1);
			}

			const { recipes, paging } = await RecipeService.getRecipes(offsetRecipes, limitRecipes);
			dispatch(recipesActions.setRecipesAll(recipes));
			setTotalPages(Math.ceil(paging.total / limitRecipes));

			window.scrollTo(0, 0);
			setTimeout(() => {
				setLoading(false);
			}, 500);

			// }
		} catch (error) {
			setLoading(false);
		}
	};

	const handlerSetRecipesFavorite = async () => {
		try {
			if (currentUser) {
				const { recipes } = await RecipeService.getRecipesFavoriteWithDetailsByUserId(currentUser, navigate, dispatch);
				dispatch(recipesActions.setRecipesFavorite(recipes));
				// setTotalPages(Math.ceil(paging.total / limitRecipes));
			}
			// setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<RecipeAllContainer>
			{loading ? (
				<Spinner message={"Cargando recetas..."} />
			) : (
				<>
					<h1>
						Encontrá las mejores recetas aquí <FcReading />
					</h1>
					<Hero />
					<Categories />
					<Recipes />
					{recipesAll.length > 0 && totalPages > 1 && (
						<PaginationCustom currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pathNavigate={"/recetas"} />
					)}
				</>
			)}
		</RecipeAllContainer>
	);
};

export default RecipeAll;
