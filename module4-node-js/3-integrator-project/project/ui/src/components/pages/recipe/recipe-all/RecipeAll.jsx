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
import { FcReading } from "react-icons/fc";
import { SpinnerCustom } from "../../../atomics/spinner/SpinnerCustom";
import { MessageNotExistRecipes } from "../../../no-atomics/recipes/RecipesStyles";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import RecipeFavoriteService from "../../../../service/RecipeFavoriteService";
import { RecipePageSection } from "../../../../model/enum/PageSection";
import CustomException from "../../../../model/CustomException";
import { HttpStatusCode } from "axios";

const RecipeAll = () => {
	const { recipesAll } = useSelector((state) => state.recipes);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const { page } = useParams();
	const [currentPage, setCurrentPage] = useState(page > 0 ? Number(page) || 1 : 1);

	const [totalPages, setTotalPages] = useState(1);
	const limitRecipes = 12;
	const offsetRecipes = (currentPage - 1) * limitRecipes;

	useEffect(() => {
		dispatch(userActions.setUserSection(RecipePageSection.RecipeAll));
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
			SnackbarUtils.error(error, 2500, dispatch);
		}
	};

	const handlerSetRecipesFavorite = async () => {
		try {
			if (currentUser) {
				const { recipes } = await RecipeFavoriteService.getRecipesFavoriteWithDetailsByUserId(currentUser, navigate, dispatch);
				dispatch(recipesActions.setRecipesFavorite(recipes));
			}
		} catch (error) {
			setTimeout(() => {
				setLoading(false);
			}, 500);
			SnackbarUtils.error(error, 2500, dispatch);
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
					<Recipes messageNotExistRecipes={"¡Lo sentimos! No existen recetas"} />

					{recipesAll.length > 0 && (
						<PaginationCustom currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pathNavigate={"/recetas"} />
					)}
				</>
			)}
		</RecipeAllContainer>
	);
};

export default RecipeAll;
