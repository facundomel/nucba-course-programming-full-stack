import React from "react";
import { FormContainerStyled } from "../../shared/comp/form/FormStyles";
import { MainContainerStyled } from "../../shared/styles/MainStyles";
import { CardPokemon } from "../card/CardPokemon";
import { FormPokeAPI } from "../form-poke-api/FormPokeAPI";

export const MainPokeAPI = () => {
	return (
		<>
			<MainContainerStyled>
				<FormContainerStyled>
					<FormPokeAPI />
					<CardPokemon />
				</FormContainerStyled>
			</MainContainerStyled>
		</>
	);
};
