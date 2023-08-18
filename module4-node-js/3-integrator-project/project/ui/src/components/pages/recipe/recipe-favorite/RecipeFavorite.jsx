import React, { useEffect, useState } from "react";
import Hero from "../../../no-atomics/hero/Hero";
import Recipes from "../../../no-atomics/recipes/Recipes";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../../redux/user/UserActions.js";
import Categories from "../../../no-atomics/recipes-category/Categories";
import { RecipeFavoriteContainer } from "./RecipeFavoriteStyles";
import * as recipesActions from "../../../../redux/recipes/RecipesActions.js";
import { useNavigate, useParams } from "react-router-dom";
import PaginationCustom from "../../../no-atomics/pagination/PaginationCustom";
import { FcRating } from "react-icons/fc";
import { SpinnerCustom } from "../../../atomics/spinner/SpinnerCustom";
import { MessageNotExistRecipes } from "../../../no-atomics/recipes/RecipesStyles";
import SnackbarUtils from "../../../../utils/SnackbarUtils";
import RecipeFavoriteService from "../../../../service/RecipeFavoriteService";
import { RecipePageSection } from "../../../../model/enum/PageSection";
import { LinkStyled } from "../../../no-atomics/error/ErrorCustomStyles";

const RecipeFavorite = () => {
	const { recipesFavorite } = useSelector((state) => state.recipes);
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { page } = useParams();
	const [currentPage, setCurrentPage] = useState(Number(page) || 1);
	const [totalPages, setTotalPages] = useState(1);
	const limitRecipes = 12;
	const offsetRecipes = (currentPage - 1) * limitRecipes;

	useEffect(() => {
		dispatch(userActions.setUserSection(RecipePageSection.RecipeFavorite));
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
				const { recipes, paging } = await RecipeFavoriteService.getRecipesFavoriteWithDetailsByUserId(
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

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			navigate(`/recetas-favoritas/${currentPage - 1}`);
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
							<>
								{currentPage === 1 ? (
									<MessageNotExistRecipes>¡Lo sentimos! No existen recetas favoritas</MessageNotExistRecipes>
								) : (
									currentPage > 1 && (
										<>
											<MessageNotExistRecipes>¡Lo sentimos! No existen recetas favoritas en la página actual</MessageNotExistRecipes>
											{
												<LinkStyled to={`/recetas-favoritas/${currentPage - 1}`} onClick={() => goToPreviousPage()}>
													Volver a la página anterior
												</LinkStyled>
											}
										</>
									)
								)}
							</>
						)}

						{recipesFavorite.length > 0 && (
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
