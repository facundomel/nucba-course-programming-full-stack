import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PokeAPIContext } from "../../../contexts/PokeAPIContext";
import LocalStorage from "../../../repository/LocalStorage";
import { CardContainerStyled, CardTextContentContainerStyled, IDAndBtnDeleteContainer } from "./CardPokemonStyles";
import PokemonImage from "./image/PokemonImage";

export const CardPokemon = (props) => {
	const keyLocalStorage = "pokemon";
	const { handleFocusInputPokemon, setPokemon } = useContext(PokeAPIContext);
	const { id, name, img } = props.pokemon;

	const deletePokemon = () => {
		setPokemon("");
		LocalStorage.remove(keyLocalStorage);
		handleFocusInputPokemon();
	};

	return (
		<CardContainerStyled>
			<IDAndBtnDeleteContainer>
				<span>#{id}</span>
				<MdDelete className="btn-delete" onClick={() => deletePokemon()} />
			</IDAndBtnDeleteContainer>
			<PokemonImage image={img} alt={name} />

			<CardTextContentContainerStyled>
				<h2>{name.toUpperCase()}</h2>
			</CardTextContentContainerStyled>
		</CardContainerStyled>
	);
};
