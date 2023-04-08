import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AiFillStarCustom,
	AiOutlineStarCustom,
	ButtonFavorite,
	CardInformation,
	CardRecipeContainer,
	CardUserAndFavorite,
} from "./RecipesStyles";
import * as recipeActions from "../../../redux/recipes/RecipesActions.js";

export const CardRecipe = ({ id, name, description, img, user }) => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { recipesAll, recipeSection } = useSelector((state) => state.recipes);
	const recipeIndex = recipesAll.findIndex((recipe) => recipe.id == id);
	const [hiddenCard, setHiddenCard] = useState(false);

	const handlerOnClickStar = () => {
		if (!recipesAll[recipeIndex].isFavorite) {
			recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: true };
			dispatch(recipeActions.setRecipeFavorite(recipesAll));
		} else {
			recipesAll[recipeIndex] = { ...recipesAll[recipeIndex], isFavorite: false };
			dispatch(recipeActions.setRecipeFavorite(recipesAll));
			if (recipeSection == "MyRecipes") {
				setHiddenCard(true);
			}
		}
	};

	return (
		<>
			{recipeSection == "MyRecipes" ? (
				<CardRecipeContainer hiddenCard={hiddenCard}>
					<img src={img} alt={name} />
					<CardInformation>
						<h2>{name}</h2>
						<p>{description}</p>
					</CardInformation>
					<CardUserAndFavorite>
						<p>{user}</p>
						{currentUser && (
							<ButtonFavorite onClick={() => handlerOnClickStar()}>
								{recipesAll[recipeIndex].isFavorite ? <AiFillStarCustom /> : <AiOutlineStarCustom />}
							</ButtonFavorite>
						)}
					</CardUserAndFavorite>
				</CardRecipeContainer>
			) : (
				<CardRecipeContainer>
					<img src={img} alt={name} />
					<CardInformation>
						<h2>{name}</h2>
						<p>{description}</p>
					</CardInformation>
					<CardUserAndFavorite>
						<p>{user}</p>
						{currentUser && (
							<ButtonFavorite onClick={() => handlerOnClickStar()}>
								{recipesAll[recipeIndex].isFavorite ? <AiFillStarCustom /> : <AiOutlineStarCustom />}
							</ButtonFavorite>
						)}
					</CardUserAndFavorite>
				</CardRecipeContainer>
			)}
		</>
	);
};
