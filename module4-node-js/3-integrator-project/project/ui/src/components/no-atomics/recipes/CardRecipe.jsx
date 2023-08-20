import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as recipeActions from "../../../redux/recipes/RecipesActions.js";
import Modal from "../modal/Modal";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
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
} from "./CardRecipeStyles.js";
import SnackbarUtils from "../../../utils/SnackbarUtils.js";
import RecipeFavoriteService from "../../../service/RecipeFavoriteService.js";
import { RecipePageSection } from "../../../model/enum/PageSection.js";

const CardRecipe = ({ recipe }) => {
	const { id, title, description, urlImage, ingredients, instructions, user } = recipe;
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { recipesFavorite } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);
	const [hiddenCard] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
	const navigate = useNavigate();
	const buttonIconGoBookRef = useRef();

	const handlerOnClickStar = async () => {
		if (!isFavoriteRecipe) {
			try {
				let recipeFavoriteCreated = await RecipeFavoriteService.createRecipeFavorite(currentUser, recipe.id, navigate, dispatch);
				if (recipeFavoriteCreated != null) {
					recipeFavoriteCreated = await RecipeFavoriteService.getRecipesFavoriteWithDetailsByUserIdAndRecipeId(
						currentUser,
						recipeFavoriteCreated.recipeId,
						navigate,
						dispatch
					);
					dispatch(recipeActions.setRecipesFavorite([...recipesFavorite, recipeFavoriteCreated]));
				}
			} catch (error) {
				SnackbarUtils.error(error, 2500, dispatch);
			}
		} else {
			try {
				const recipeFavoriteDeleted = await RecipeFavoriteService.deleteRecipeFavorite(currentUser, recipe.id, navigate, dispatch);
				if (recipeFavoriteDeleted != null) {
					dispatch(
						recipeActions.setRecipesFavorite(recipesFavorite.filter((recipeFavorite) => recipeFavorite.id !== recipeFavoriteDeleted.id))
					);
					if (recipesFavorite.length - 1 === 0) {
						window.scrollTo(0, 0);
					}
				}
			} catch (error) {
				SnackbarUtils.error(error, 2500, dispatch);
			}
		}
	};

	const handlerOpenModal = (status) => {
		setOpenModal(status);
		if (!openModal) buttonIconGoBookRef.current?.blur();
	};

	useEffect(() => {
		setIsFavoriteRecipe(recipesFavorite.some((favorite) => favorite.id === id));
	}, [recipesFavorite, id]);

	return (
		<>
			<CardRecipeContainer hiddenCard={userSection === RecipePageSection.RecipeFavorite && hiddenCard} userSection={userSection}>
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
