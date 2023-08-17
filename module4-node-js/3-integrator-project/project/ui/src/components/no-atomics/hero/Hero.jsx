import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { HeroContainerStyled, HeroFormStyled, HeroSearchBarStyled, IconWrapperStyled, MessageNotExistRecipes } from "./HeroStyles";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";
import RecipeService from "../../../service/RecipeService";
import { FcSearch } from "react-icons/fc";
import { RecipePageSection } from "../../../model/enum/PageSection";

const Hero = () => {
	const [searchedRecipe, setSearchedRecipe] = useState("");
	const dispatch = useDispatch();
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);

	useEffect(() => {
		let filteredRecipes = [];

		if (userSection === RecipePageSection.RecipeAll) {
			if (searchedRecipe === "") {
				filteredRecipes = recipesAll;
			} else {
				filteredRecipes = recipesAll.filter((recipe) => {
					if (recipe.title.toLowerCase().includes(searchedRecipe.toLowerCase())) {
						return recipe;
					}
				});
			}
		} else if (userSection === RecipePageSection.RecipeFavorite) {
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
			{((userSection === RecipePageSection.RecipeFavorite && recipesFavorite.length > 0) ||
				(userSection === RecipePageSection.RecipeAll && recipesAll.length > 0)) && (
				<HeroContainerStyled>
					<HeroFormStyled>
						<HeroSearchBarStyled
							value={searchedRecipe}
							onChange={(event) => setSearchedRecipe(event.target.value)}
							type="text"
							placeholder="Buscá tu receta"
							autoFocus
						/>
						<IconWrapperStyled>
							<FcSearch />
						</IconWrapperStyled>
					</HeroFormStyled>
				</HeroContainerStyled>
			)}
		</>
	);
};

export default Hero;
