import React, { useContext, useRef, useState } from "react";
import { FcSearch } from "react-icons/fc";
import LocalStorage from "../../../repository/LocalStorage";
import { Button } from "../../button/Button";
import { FormStyled, InputAndErrorMessageContainerStyled, InputAndIconContainerStyled } from "../../styles/FormStyles";
import pokeApiService from "../../../service/PokeAPIService";
import Pokemon from "../../../model/Pokemon";
import { CardPokemon } from "../card/CardPokemon";
import { PokeAPIContext } from "../../../contexts/PokeAPIContext";

export const Form = () => {
	const { handleAddPokemon, pokemon } = useContext(PokeAPIContext);
	const refInputPokemon = useRef(null);
	const [pokemonId, setPokemonId] = useState("");
	const [messageNotExistPokemon, setMessageNotExistPokemon] = useState("");

	const handleSetMessageNotExistPokemon = () => {
		if (messageNotExistPokemon == "") return;

		setMessageNotExistPokemon("");
	};

	const getPokemonById = async () => {
		try {
			handleAddPokemon(null);
			const poke = await pokeApiService.getPokemonById(pokemonId);
			return poke;
		} catch (error) {
			if (error.response.status == 404) {
				setPokemonId("");
				setMessageNotExistPokemon("El pokémon no existe");
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if (existPokemon()) return;
		const poke = await getPokemonById();

		if (poke) {
			handleAddPokemon(new Pokemon(poke));

			LocalStorage.save("pokemon", pokemon);
			setPokemonId("");
			refInputPokemon.current.focus();
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
					<Button value="Agregar" clickHandler={handleSubmit} isDisabled={!pokemonId ? true : false} width="20%" />
				</FormStyled>
				{messageNotExistPokemon && <small>El pokemon no existe</small>}
			</InputAndErrorMessageContainerStyled>
			{pokemon && !messageNotExistPokemon && <CardPokemon pokemon={pokemon} />}
		</>
	);
};
