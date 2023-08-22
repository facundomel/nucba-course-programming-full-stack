import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeroContainerStyled, HeroFormStyled, HeroSearchBarStyled, IconWrapperStyled } from "./HeroStyles";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";
import { FcSearch } from "react-icons/fc";
import { RecipePageSection } from "../../../model/enum/PageSection";

const Hero = () => {
	const [searchedRecipe, setSearchedRecipe] = useState("");
	const dispatch = useDispatch();
	const { recipesAll, recipesFavorite } = useSelector((state) => state.recipes);
	const { pageSection } = useSelector((state) => state.pageSection);

	useEffect(() => {
		let filteredRecipes = [];

		if (pageSection === RecipePageSection.RecipeAll) {
			if (searchedRecipe === "") {
				filteredRecipes = recipesAll;
			} else {
				filteredRecipes = recipesAll.filter((recipe) => {
					if (recipe.title.toLowerCase().includes(searchedRecipe.toLowerCase())) {
						return recipe;
					}
				});
			}
		} else if (pageSection === RecipePageSection.RecipeFavorite) {
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
			{((pageSection === RecipePageSection.RecipeFavorite && recipesFavorite.length > 0) ||
				(pageSection === RecipePageSection.RecipeAll && recipesAll.length > 0)) && (
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
