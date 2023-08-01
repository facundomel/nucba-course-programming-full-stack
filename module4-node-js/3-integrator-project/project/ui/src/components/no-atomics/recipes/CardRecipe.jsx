import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AiFillStarCustom,
	AiOutlineStarCustom,
	ButtonIconCard,
	CardInformation,
	CardRecipeContainer,
	CardUserAndFavorite,
	GoBookCustom,
	IconsCardContainer,
	ImageDiv,
	ModalBodyCardRecipeContainer,
	ModalBodyCardRecipeInformation,
	ModalBodyCardRecipePublisher,
	TitleCard,
} from "./RecipesStyles";
import * as recipeActions from "../../../redux/recipes/RecipesActions.js";
import Modal from "../modal/Modal";
import * as snackbarActions from "../../../redux/snackbar/SnackbarActions.js";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import RecipeService from "../../../service/RecipeService";
import { useNavigate } from "react-router-dom";

const CardRecipe = ({ recipe }) => {
	const { id, title, description, urlImage, ingredients, instructions, user } = recipe;
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { recipesAll, recipesFavorite, recipesFiltered } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);
	const recipeIndex = recipesAll.findIndex((recipe) => recipe.id === id);
	const [hiddenCard, setHiddenCard] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
	const navigate = useNavigate();
	const buttonIconGoBookRef = useRef();

	const handlerOnClickStar = async () => {
		if (!isFavoriteRecipe) {
			// recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: true };
			// dispatch(recipeActions.setRecipesFavorite(recipesAll));
			// if (userSection === "RecipeFavorite") {
			// 	dispatch(recipeActions.setRecipesFiltered(recipesAll.filter((recipe) => recipe.isFavorite)));
			// }
			// setIsFavoriteRecipe(true);

			try {
				let recipeFavoriteCreated = await RecipeService.createRecipeFavorite(currentUser, recipe.id, navigate, dispatch);
				if (recipeFavoriteCreated != null) {
					recipeFavoriteCreated = await RecipeService.getRecipesFavoriteWithDetailsByUserIdAndRecipeId(
						currentUser,
						recipe.id,
						navigate,
						dispatch
					);
					dispatch(recipeActions.setRecipesFavorite([...recipesFavorite, recipeFavoriteCreated]));
					dispatch(
						snackbarActions.setOptionsSnackbar({
							open: true,
							severity: "success",
							message: `Receta agregada a favorito`,
						})
					);
				}
				// setIsFavoriteRecipe(true);
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const recipeFavoriteDeleted = await RecipeService.deleteRecipeFavorite(currentUser, recipe.id, navigate, dispatch);
				// recipeFavoriteDeleted = await RecipeService.getRecipesFavoriteWithDetailsByUserIdAndRecipeId(
				// 	currentUser,
				// 	recipe.id,
				// 	navigate,
				// 	dispatch
				// );
				if (recipeFavoriteDeleted != null) {
					dispatch(
						recipeActions.setRecipesFavorite(recipesFavorite.filter((recipeFavorite) => recipeFavorite.id !== recipeFavoriteDeleted.id))
					);
					dispatch(
						snackbarActions.setOptionsSnackbar({
							open: true,
							severity: "warning",
							message: `Receta quitada de favorito`,
						})
					);
				}
			} catch (error) {
				console.log(error);
			}
			// dispatch(
			// 	snackbarActions.setOptionsSnackbar({
			// 		open: true,
			// 		severity: "warning",
			// 		message: `Receta quitada de favorito`,
			// 	})
			// );
			// recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: false };
			// dispatch(recipeActions.setRecipesFavorite(recipesAll));
			// if (userSection === "RecipeFavorite") {
			// 	setHiddenCard(true);
			// 	dispatch(recipeActions.setRecipesFiltered(recipesAll.filter((recipe) => recipe.isFavorite)));
			// }
		}
	};

	// useEffect(() => {
	// 	setIsOpenModal(openModal)
	// }, [openModal]);

	const handlerOpenModal = (status) => {
		setOpenModal(status);
		if (!openModal) buttonIconGoBookRef.current?.blur();
	};

	useEffect(() => {
		setIsFavoriteRecipe(recipesFavorite.some((favorite) => favorite.id === id));
	}, [recipesFavorite, id]);

	return (
		<>
			<CardRecipeContainer hiddenCard={userSection === "RecipeFavorite" && hiddenCard}>
				<ImageDiv>
					<img src={urlImage} alt={title} />
				</ImageDiv>
				<CardInformation>
					<h2>{title}</h2>
					<p>{description}</p>
				</CardInformation>
				<CardUserAndFavorite>
					<p>
						{user.firstName} {user.lastName}
					</p>
					<IconsCardContainer>
						<ButtonIconCard onClick={() => handlerOpenModal(true)} ref={buttonIconGoBookRef}>
							<GoBookCustom />
						</ButtonIconCard>
						{currentUser && (
							<ButtonIconCard onClick={() => handlerOnClickStar()}>
								{/* {recipesAll[recipeIndex].isFavorite ? <AiFillStarCustom /> : <AiOutlineStarCustom />} */}
								{isFavoriteRecipe ? <AiFillStarCustom /> : <AiOutlineStarCustom />}
							</ButtonIconCard>
						)}
					</IconsCardContainer>
				</CardUserAndFavorite>
			</CardRecipeContainer>

			<Modal
				isOpen={openModal}
				onClose={() => handlerOpenModal(false)}
				heightBodyModal={"80%"}
				widthBodyModal={"700px"}
				pxMediaQuery={"800px"}
			>
				<ModalBodyCardRecipeContainer>
					<img src={urlImage} alt={title} />
					<ModalBodyCardRecipeInformation>
						<div>
							<h2>{title}</h2>
						</div>

						<h3>Ingredientes</h3>
						<ul>
							{ingredients?.split("\n").map((ingredient) => {
								return <li key={uuid()}>{ingredient}</li>;
							})}
						</ul>

						<h3>Instrucciones</h3>
						<ol>
							{instructions?.split("\n").map((instructions) => {
								return <li key={uuid()}>{instructions}</li>;
							})}
						</ol>
						<ModalBodyCardRecipePublisher>
							<p>
								By {user.firstName} {user.lastName}
							</p>
						</ModalBodyCardRecipePublisher>
					</ModalBodyCardRecipeInformation>
				</ModalBodyCardRecipeContainer>
			</Modal>
		</>
	);
};

export default CardRecipe;
