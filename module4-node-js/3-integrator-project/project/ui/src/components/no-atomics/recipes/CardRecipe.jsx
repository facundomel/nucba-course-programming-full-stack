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
	ModalBodyCardRecipeContainer,
	ModalBodyCardRecipeInformation,
	ModalBodyCardRecipePublisher,
} from "./RecipesStyles";
import * as recipeActions from "../../../redux/recipes/RecipesActions.js";
import Modal from "../modal/Modal";
import * as snackbarActions from "../../../redux/snackbar/SnackbarActions.js";

const CardRecipe = ({ id, name, description, img, publisher, ingredients, instructions }) => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { recipesAll } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);
	const recipeIndex = recipesAll.findIndex((recipe) => recipe.id == id);
	const [hiddenCard, setHiddenCard] = useState(false);
	const [openModal, setOpenModal] = useState(false);

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
			dispatch(recipeActions.setRecipeFavorite(recipesAll));
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
			dispatch(recipeActions.setRecipeFavorite(recipesAll));
			if (userSection === "RecipeFavorite") {
				setHiddenCard(true);
				dispatch(recipeActions.setRecipesFiltered(recipesAll.filter((recipe) => recipe.isFavorite)));
			}
		}
	};

	return (
		<>
			<CardRecipeContainer hiddenCard={userSection === "RecipeFavorite" && hiddenCard}>
				<img src={img} alt={name} />
				<CardInformation>
					<h2>{name}</h2>
					<p>{description}</p>
				</CardInformation>
				<CardUserAndFavorite>
					<p>{publisher}</p>
					<IconsCardContainer>
						<ButtonIconCard onClick={() => setOpenModal(true)}>
							<GoBookCustom />
						</ButtonIconCard>
						{currentUser && (
							<ButtonIconCard onClick={() => handlerOnClickStar()}>
								{recipesAll[recipeIndex].isFavorite ? <AiFillStarCustom /> : <AiOutlineStarCustom />}
							</ButtonIconCard>
						)}
					</IconsCardContainer>
				</CardUserAndFavorite>
			</CardRecipeContainer>

			<Modal isOpen={openModal} onClose={() => setOpenModal(false)} heightBodyModal={"80%"} widthBodyModal={"700px"} pxMediaQuery={"800px"}>
				<ModalBodyCardRecipeContainer>
					<img src={img} alt={name} />
					<ModalBodyCardRecipeInformation>
						<div>
							<h2>{name}</h2>
						</div>
						<h3>Ingredientes</h3>
						<ul>
							{ingredients?.map((ingredient) => {
								return <li key={ingredient}>{ingredient}</li>;
							})}
						</ul>
						<h3>Instrucciones</h3>
						<ol>
							{instructions?.map((instructions) => {
								return <li key={instructions}>{instructions}</li>;
							})}
						</ol>
						<ModalBodyCardRecipePublisher>
							<p>By {publisher}</p>
						</ModalBodyCardRecipePublisher>
					</ModalBodyCardRecipeInformation>
				</ModalBodyCardRecipeContainer>
			</Modal>
		</>
	);
};

export default CardRecipe;
