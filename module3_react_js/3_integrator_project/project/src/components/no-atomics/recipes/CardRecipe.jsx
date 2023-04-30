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
	ModalContainer,
	ModalInformationContainer,
	PublisherModalContainer,
} from "./RecipesStyles";
import * as recipeActions from "../../../redux/recipes/RecipesActions.js";
import Modal from "../modal/Modal";

export const CardRecipe = ({ setOptionsSnackbar, id, name, description, img, publisher, ingredients, instructions }) => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { recipesAll, recipeSection } = useSelector((state) => state.recipes);
	const recipeIndex = recipesAll.findIndex((recipe) => recipe.id == id);
	const [hiddenCard, setHiddenCard] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const handlerOnClickStar = () => {
		if (!recipesAll[recipeIndex].isFavorite) {
			setOptionsSnackbar({ open: true, severity: "success", message: "Receta agregada a favorito" });
			recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: true };
			dispatch(recipeActions.setRecipeFavorite(recipesAll));
			if (recipeSection == "MyRecipes") {
				dispatch(recipeActions.setRecipesFiltered(recipesAll.filter((recipe) => recipe.isFavorite)));
			}
		} else {
			setOptionsSnackbar({ open: true, severity: "warning", message: "Receta quitada de favorito" });
			recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: false };
			dispatch(recipeActions.setRecipeFavorite(recipesAll));
			if (recipeSection == "MyRecipes") {
				setHiddenCard(true);
				dispatch(recipeActions.setRecipesFiltered(recipesAll.filter((recipe) => recipe.isFavorite)));
			}
		}
	};

	return (
		<>
			<CardRecipeContainer hiddenCard={recipeSection == "MyRecipes" && hiddenCard}>
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

			<Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
				<ModalContainer>
					<img src={img} alt={name} />
					<ModalInformationContainer>
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
						<PublisherModalContainer>
							<p>By {publisher}</p>
						</PublisherModalContainer>
					</ModalInformationContainer>
				</ModalContainer>
			</Modal>
		</>
	);
};
