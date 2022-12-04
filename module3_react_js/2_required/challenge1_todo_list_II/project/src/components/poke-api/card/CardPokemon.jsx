import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PokeAPIContext } from "../../../contexts/PokeAPIContext";
import LocalStorage from "../../../repository/LocalStorage";
import {
	CardContainerStyled,
	CardTextContentContainerStyled,
	IDAndBtnDeleteContainer,
	MessageNotPokemonSavedStyled,
} from "./CardPokemonStyles";
import PokemonImage from "./image/PokemonImage";

export const CardPokemon = () => {
	const keyLocalStorage = "pokemon";
	const { handleFocusInputPokemon, setPokemon, pokemon } = useContext(PokeAPIContext);

	const deletePokemon = () => {
		setPokemon("");
		LocalStorage.remove(keyLocalStorage);
		handleFocusInputPokemon();
	};

	return (
		<>
			{pokemon ? (
				<CardContainerStyled>
					<IDAndBtnDeleteContainer>
						<span>#{pokemon.id}</span>
						<MdDelete className="btn-delete" onClick={() => deletePokemon()} />
					</IDAndBtnDeleteContainer>
					<PokemonImage image={pokemon.img} alt={pokemon.name} />

					<CardTextContentContainerStyled>
						<h2>{pokemon.name.toUpperCase()}</h2>
					</CardTextContentContainerStyled>
				</CardContainerStyled>
			) : (
				<MessageNotPokemonSavedStyled> No hay ningún pokemon almacenado </MessageNotPokemonSavedStyled>
			)}
		</>
	);
};
