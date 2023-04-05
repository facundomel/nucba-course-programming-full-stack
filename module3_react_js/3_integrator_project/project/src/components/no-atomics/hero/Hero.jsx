import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { HeroContainerStyled, HeroFormStyled, HeroSearchBarStyled, IconWrapperStyled } from "./HeroStyles";
import * as recipesActions from "../../../redux/recipes/RecipesActions.js";

const Hero = ({ recipesToFilter }) => {
	const [query, setQuery] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const filteredRecipes = recipesToFilter.filter((recipe) => {
			if (query === "") {
				return recipe;
			} else if (recipe.name.toLowerCase().includes(query.toLowerCase())) {
				return recipe;
			}
		});

		dispatch(recipesActions.setRecipesFiltered(filteredRecipes));
	}, [query]);

	return (
		<HeroContainerStyled>
			<h1>¿Qué receta estás buscando?</h1>
			<HeroFormStyled>
				<HeroSearchBarStyled value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Buscá tu receta" autoFocus />
				<IconWrapperStyled>
					<AiOutlineSearch />
				</IconWrapperStyled>
			</HeroFormStyled>
		</HeroContainerStyled>
	);
};

export default Hero;
