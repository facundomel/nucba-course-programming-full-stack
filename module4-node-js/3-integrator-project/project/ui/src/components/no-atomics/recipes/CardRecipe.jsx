import React, { useState } from "react";
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

const CardRecipe = ({ recipe, setIsOpenModal }) => {
	const { id, title, description, urlImage, ingredients, instructions, user } = recipe;
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { recipesAll, recipesFavorite, recipesFiltered } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);
	const recipeIndex = recipesAll.findIndex((recipe) => recipe.id === id);
	const [hiddenCard, setHiddenCard] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	// const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false)
	const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false)

	// useEffect(() => {
  //   if (userSection === "RecipeFavorite") {
  //     setIsFavoriteRecipe(true);
  //   } else if (currentUser && isRecipeFavorite(id)) {
  //     setIsFavoriteRecipe(true);
  //   } else {
  //     setIsFavoriteRecipe(false);
  //   }
  // }, [userSection, currentUser, recipesAll, recipesFavorite]);

	const handlerOnClickStar = () => {
		if (!recipesAll[recipeIndex].isFavorite) {
			dispatch(
				snackbarActions.setOptionsSnackbar({
					open: true,
					severity: "success",
					message: `Receta agregada a favorito`,
				})
			);
			recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: true };
			dispatch(recipeActions.setRecipesFavorite(recipesAll));
			if (userSection === "RecipeFavorite") {
				dispatch(recipeActions.setRecipesFiltered(recipesAll.filter((recipe) => recipe.isFavorite)));
			}
		} else {
			dispatch(
				snackbarActions.setOptionsSnackbar({
					open: true,
					severity: "warning",
					message: `Receta quitada de favorito`,
				})
			);
			recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: false };
			dispatch(recipeActions.setRecipesFavorite(recipesAll));
			if (userSection === "RecipeFavorite") {
				setHiddenCard(true);
				dispatch(recipeActions.setRecipesFiltered(recipesAll.filter((recipe) => recipe.isFavorite)));
			}
		}
	};

	const handlerOpenModel = (status) => {
		setOpenModal(status);
		setIsOpenModal(status);
	};

	// const isRecipeFavorite = (recipeId) => {
	// 	return recipesFavorite.some((favorite) => favorite.id === recipeId);
	// };

	// const isFavoriteRecipe = userSection === "RecipeFavorite" || (currentUser && isRecipeFavorite(id));

	useEffect(() => {
		setIsFavoriteRecipe(recipesFavorite.some((favorite) => favorite.id === id))
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
						<ButtonIconCard onClick={() => handlerOpenModel(true)}>
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
				onClose={() => handlerOpenModel(false)}
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
								return <li key={ingredient}>{ingredient}</li>;
							})}
						</ul>

						<h3>Instrucciones</h3>
						<ol>
							{instructions?.split("\n").map((instructions) => {
								return <li key={instructions}>{instructions}</li>;
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
