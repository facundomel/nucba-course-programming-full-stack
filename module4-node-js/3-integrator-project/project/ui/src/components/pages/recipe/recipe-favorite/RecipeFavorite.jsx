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
import { SpinnerCustom } from "../../../atomics/spinner/SpinnerCustom";
import Utils from "../../../../utils/Utils";
import { MessageNotExistRecipes } from "../../../no-atomics/recipes/RecipesStyles";
import SnackbarUtils from "../../../../utils/SnackbarUtils";

const RecipeFavorite = () => {
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { currentUser, userSection } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { page } = useParams();
	const [currentPage, setCurrentPage] = useState(Number(page) || 1);
	const [totalPages, setTotalPages] = useState(1);
	const limitRecipes = 12;
	const offsetRecipes = (currentPage - 1) * limitRecipes;

	useEffect(() => {
		dispatch(userActions.setUserSection("RecipeFavorite"));
	}, []);

	useEffect(() => {
		setLoading(true);
		handlerSetRecipesFavorite();
		setTimeout(() => {
			setLoading(false);
			window.scrollTo(0, 0);
		}, 500);
	}, [currentPage]);

	const handlerSetRecipesFavorite = async () => {
		try {
			if (currentUser) {
				const { recipes, paging } = await RecipeService.getRecipesFavoriteWithDetailsByUserId(
					currentUser,
					navigate,
					dispatch,
					offsetRecipes,
					limitRecipes
				);
				const totalPagesTemp = Math.ceil(paging.total / limitRecipes);
				dispatch(recipesActions.setRecipesFavorite(recipes));
				setTotalPages(totalPagesTemp);

				if (currentPage > totalPagesTemp) {
					setCurrentPage(1);
				}
			}
		} catch (error) {
			setTimeout(() => {
				setLoading(false);
			}, 500);
			SnackbarUtils.error(error, 2500, dispatch);
		}
	};

	return (
		<>
			<RecipeFavoriteContainer>
				{loading ? (
					<SpinnerCustom message={"Cargando favoritos..."} />
				) : (
					<>
						{recipesFavorite.length > 0 ? (
							<>
								<h1>
									Mis recetas favoritas <FcRating />
								</h1>
								<Hero />
								<Categories />
								<Recipes />
							</>
						) : (
							<MessageNotExistRecipes>¡Lo sentimos! No existen recetas</MessageNotExistRecipes>
						)}
						{recipesFavorite.length > 0 && totalPages > 1 && (
							<PaginationCustom
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
								pathNavigate={"/recetas-favoritas"}
							/>
						)}
					</>
				)}
			</RecipeFavoriteContainer>
		</>
	);
};

export default RecipeFavorite;
