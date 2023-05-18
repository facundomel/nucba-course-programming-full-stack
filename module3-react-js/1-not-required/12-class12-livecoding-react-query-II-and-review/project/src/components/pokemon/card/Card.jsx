import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PokemonContext } from "../../../contexts/PokemonContext";
import localStoragePokemon from "../../../repository/LocalStoragePokemon";
import {
	CardContainerStyled,
	CardTextContentContainerStyled,
	IDAndBtnDelete,
	IDAndBtnDeleteContainer,
	MessageNotPokemonSavedStyled,
} from "./CardStyles";
import Image from "./image/Image";

export const Card = () => {
	const keyLocalStorage = "pokemon";
	const { handlerFocusInputPokemon, setPokemon, pokemon } = useContext(PokemonContext);

	const deletePokemon = () => {
		setPokemon("");
		localStoragePokemon.removePokemon(keyLocalStorage);
		handlerFocusInputPokemon();
	};

	return (
		<>
			{pokemon ? (
				<CardContainerStyled>
					<IDAndBtnDeleteContainer>
						<IDAndBtnDelete>
							<span>#{pokemon.id}</span>
							<MdDelete className="btn-delete" onClick={() => deletePokemon()} />
						</IDAndBtnDelete>
					</IDAndBtnDeleteContainer>
					<Image image={pokemon.img} alt={pokemon.name} />

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
