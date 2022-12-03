import React from "react";
import { CardContainerStyled, CardTextContentContainerStyled } from "./CardPokemonStyles";
import PokemonImage from "./image/PokemonImage";

export const CardPokemon = (props) => {
	const { id, name, img } = props.pokemon;

	return (
		<CardContainerStyled>
			<span>#{id}</span>
			<PokemonImage image={img} alt={name} />

			<CardTextContentContainerStyled>
				<h2>{name.toUpperCase()}</h2>
			</CardTextContentContainerStyled>
		</CardContainerStyled>
	);
};
