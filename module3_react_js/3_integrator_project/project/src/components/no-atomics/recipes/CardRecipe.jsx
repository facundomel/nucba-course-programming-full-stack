import React, { useState } from "react";
import { AiFillStarCustom, AiOutlineStarCustom, CardInformation, CardRecipeContainer, CardUserAndFavorite } from "./RecipesStyles";

export const CardRecipe = ({ id, name, description, img, user, isFavorite }) => {	
	return (
		<>
			<CardRecipeContainer>
				<img src={img} alt={name} />
				<CardInformation>
					<h2>{name}</h2>
					<p>{description}</p>
				</CardInformation>
				<CardUserAndFavorite>
					<p>{user}</p>
					{!isFavorite ? (
						<AiOutlineStarCustom onClick={() => console.log("Estrella comun de key: " + id)} />
					) : (
						<AiFillStarCustom onClick={() => console.log("Estrella favorito de key: " + id)} />
					)}
				</CardUserAndFavorite>
			</CardRecipeContainer>
		</>
	);
};
