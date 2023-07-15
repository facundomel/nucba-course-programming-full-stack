import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { HeroContainerStyled, HeroFormStyled, HeroSearchBarStyled, IconWrapperStyled, MessageNotExistRecipes } from "./HeroStyles";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";

const Hero = ({ recipesToFilter }) => {
	const [searchedRecipe, setQuery] = useState("");
	const dispatch = useDispatch();
	const { recipesAll } = useSelector((state) => state.recipes);
	const { userSection } = useSelector((state) => state.user);

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
			{((userSection == "MyRecipes" && recipesAll.filter((recipe) => recipe.isFavorite).length > 0) ||
				(userSection == "Home" && recipesAll.length > 0)) && (
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
