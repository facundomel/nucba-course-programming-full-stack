import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { HeroContainerStyled, HeroFormStyled, HeroSearchBarStyled, IconWrapperStyled, MessageNotExistRecipes } from "./HeroStyles";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";
import RecipeService from "../../../service/RecipeService";

const Hero = () => {
	const [searchedRecipe, setSearchedRecipe] = useState("");
	const dispatch = useDispatch();
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);

	useEffect(() => {
		let filteredRecipes = [];

		if (userSection === "RecipeAll") {
			if (searchedRecipe === "") {
				filteredRecipes = recipesAll;
			} else {
				filteredRecipes = recipesAll.filter((recipe) => {
					if (recipe.title.toLowerCase().includes(searchedRecipe.toLowerCase())) {
						return recipe;
					}
				});
			}
		} else if (userSection === "RecipeFavorite") {
			if (searchedRecipe === "") {
				filteredRecipes = recipesFavorite;
			} else {
				filteredRecipes = recipesFavorite.filter((recipe) => {
					if (recipe.title.toLowerCase().includes(searchedRecipe.toLowerCase())) {
						return recipe;
					}
				});
			}
		}

		dispatch(recipesActions.setRecipesFiltered(filteredRecipes));
	}, [searchedRecipe]);

	return (
		<>
			{((userSection === "RecipeFavorite" && recipesFavorite.length > 0) || (userSection === "RecipeAll" && recipesAll.length > 0)) && (
				<HeroContainerStyled>
					<h1>¿Qué receta estás buscando?</h1>
					<HeroFormStyled>
						<HeroSearchBarStyled
							value={searchedRecipe}
							onChange={(event) => setSearchedRecipe(event.target.value)}
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
