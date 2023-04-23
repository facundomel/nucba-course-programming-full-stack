import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { HeroContainerStyled, HeroFormStyled, HeroSearchBarStyled, IconWrapperStyled, MessageNotExistRecipes } from "./HeroStyles";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";

const Hero = ({ recipesToFilter }) => {
	const [searchedRecipe, setQuery] = useState("");
	const dispatch = useDispatch();
	const { recipesAll, recipeSection } = useSelector((state) => state.recipes);

	useEffect(() => {
		const filteredRecipes = recipesToFilter.filter((recipe) => {
			if (searchedRecipe === "") {
				return recipe;
			} else if (recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase())) {
				return recipe;
			}
		});

		dispatch(recipesActions.setRecipesFiltered(filteredRecipes));
	}, [searchedRecipe]);

	return (
		<>
			{((recipeSection == "MyRecipes" && recipesAll.filter((recipe) => recipe.isFavorite).length > 0) ||
				(recipeSection == "Home" && recipesAll.length > 0)) && (
				<HeroContainerStyled>
					<h1>¿Qué receta estás buscando?</h1>
					<HeroFormStyled>
						<HeroSearchBarStyled
							value={searchedRecipe}
							onChange={(event) => setQuery(event.target.value)}
							type="text"
							placeholder="Buscá tu receta"
							autoFocus
						/>
						<IconWrapperStyled>
							<AiOutlineSearch />
						</IconWrapperStyled>
					</HeroFormStyled>
				</HeroContainerStyled>
			)}
		</>
	);
};

export default Hero;
