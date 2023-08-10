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
import { SpinnerCustomContainer } from "../../../atomics/spinner/SpinnerCustomStyles";
import { SpinnerCustom } from "../../../atomics/spinner/SpinnerCustom";
import CustomException from "../../../../model/CustomException";
import { HttpStatusCode } from "axios";
import Utils, { setSnackbarError } from "../../../../utils/Utils";

const RecipeAll = () => {
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
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
		setLoading(true);
		handlerSetRecipesAll();
		handlerSetRecipesFavorite();
		setTimeout(() => {
			setLoading(false);
			window.scrollTo(0, 0);
		}, 500);
	}, [currentPage]);

	const handlerSetRecipesAll = async () => {
		try {
			const { recipes, paging } = await RecipeService.getRecipes(offsetRecipes, limitRecipes);
			const totalPagesTemp = Math.ceil(paging.total / limitRecipes);
			dispatch(recipesActions.setRecipesAll(recipes));
			setTotalPages(totalPagesTemp);

			if (currentPage > totalPagesTemp) {
				setCurrentPage(1);
			}
		} catch (error) {
			setTimeout(() => {
				setLoading(false);
			}, 500);
			Utils.setSnackbarError(error, dispatch);
		}
	};

	const handlerSetRecipesFavorite = async () => {
		try {
			if (currentUser) {
				const { recipes } = await RecipeService.getRecipesFavoriteWithDetailsByUserId(currentUser, navigate, dispatch);
				dispatch(recipesActions.setRecipesFavorite(recipes));
			}
		} catch (error) {
			setTimeout(() => {
				setLoading(false);
			}, 500);
			Utils.setSnackbarError(error, dispatch);
		}
	};

	return (
		<RecipeAllContainer>
			{loading ? (
				<SpinnerCustom message={"Cargando recetas..."} />
			) : (
				<>
					{recipesAll.length > 0 && (
						<h1>
							Encontrá las mejores recetas aquí <FcReading />
						</h1>
					)}
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
