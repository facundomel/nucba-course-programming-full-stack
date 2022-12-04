import React, { useContext, useRef, useState } from "react";
import { FcSearch } from "react-icons/fc";
import LocalStorage from "../../../repository/LocalStorage";
import { Button } from "../../shared/comp/button/Button";
import { FormStyled, InputAndErrorMessageContainerStyled, InputAndIconContainerStyled } from "../../shared/styles/FormStyles";
import pokeApiService from "../../../service/PokeAPIService";
import Pokemon from "../../../model/Pokemon";
import { PokeAPIContext } from "../../../contexts/PokeAPIContext";

export const Form = () => {
	const { handleAddPokemon, refInputPokemon, handleFocusInputPokemon } = useContext(PokeAPIContext);
	const [pokemonId, setPokemonId] = useState("");
	const [messageError, setMessageError] = useState("");

	const handleSetMessageNotExistPokemon = () => {
		if (messageError == "") return;

		setMessageError("");
	};

	const getPokemonById = async () => {
		try {
			handleAddPokemon(null);
			const poke = await pokeApiService.getPokemonById(pokemonId);
			return poke;
		} catch (error) {
			if (error.response?.status == 404) {
				setPokemonId("");
				setMessageError("El pokémon no existe");
			} else {
				setMessageError(error.message);
			}
		}
	};

	const addPokemon = async (e) => {
		e.preventDefault();

		const poke = await getPokemonById();

		if (poke) {
			const newPokemon = new Pokemon(poke);
			handleAddPokemon(newPokemon);
			LocalStorage.save("pokemon", newPokemon);
			setPokemonId("");
			handleFocusInputPokemon();
		}
	};

	return (
		<>
			<InputAndErrorMessageContainerStyled>
				<FormStyled>
					<InputAndIconContainerStyled>
						<FcSearch className="icon-search" />
						<input
							type="text"
							className="input-text"
							value={pokemonId}
							onChange={(e) => (setPokemonId(e.target.value), handleSetMessageNotExistPokemon(""))}
							placeholder="Pokemon ID"
							ref={refInputPokemon}
							autoFocus
						/>
					</InputAndIconContainerStyled>
					<Button value="Buscar" clickHandler={addPokemon} isDisabled={!pokemonId ? true : false} width="20%" />
				</FormStyled>
				{messageError && <small>{messageError}</small>}
			</InputAndErrorMessageContainerStyled>
		</>
	);
};
