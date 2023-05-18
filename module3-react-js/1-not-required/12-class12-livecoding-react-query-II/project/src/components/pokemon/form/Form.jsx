import React, { useContext, useState } from "react";
import localStoragePokemon from "../../../repository/LocalStoragePokemon";
import pokeApiService from "../../../service/PokemonService";
import Pokemon from "../../../model/Pokemon";
import { PokemonContext } from "../../../contexts/PokemonContext";
import { Form as FormModel } from "../../../model/Form";
import { FormGeneric } from "../../shared/comp/form/FormGeneric";

export const Form = () => {
	const { handlerAddPokemon, refInputPokemon, handlerFocusInputPokemon } = useContext(PokemonContext);
	const [pokemonId, setPokemonId] = useState("");
	const [messageError, setMessageError] = useState("");

	const handlerSetMessageNotExistPokemon = () => {
		if (messageError == "") return;

		setMessageError("");
	};

	const getPokemonById = async () => {
		try {
			const poke = await pokeApiService.getPokemonById(pokemonId);
			return poke;
		} catch (error) {
			if (error.response?.status == 404) {
				setMessageError("El pokemon no existe");
			} else {
				setMessageError(error.message);
			}
		}
	};

	const handlerClickButton = async (e) => {
		e.preventDefault();

		const poke = await getPokemonById();

		if (poke) {
			const newPokemon = new Pokemon(poke);
			handlerAddPokemon(newPokemon);
			localStoragePokemon.savePokemon("pokemon", newPokemon);
			setPokemonId("");
			handlerFocusInputPokemon();
		}
	};

	const handlerOnChangeInput = (e) => {
		setPokemonId(e.target.value);
		handlerSetMessageNotExistPokemon("");
	};

	const handlerDisableButton = () => {
		return !pokemonId || isNaN(pokemonId) ? true : false;
	};

	const handlerMessageError = () => {
		return messageError && <small>{messageError}</small>;
	};

	const handlerMessagePokemonID = () => {
		if (pokemonId && isNaN(pokemonId)) return <small>El Pokemon ID debe ser un número</small>;
	};

	const dataForm = new FormModel(
		pokemonId,
		"Pokemon ID",
		refInputPokemon,
		handlerOnChangeInput,
		handlerClickButton,
		handlerDisableButton,
		handlerMessageError,
		"Buscar",
		handlerMessagePokemonID
	);

	return (
		<>
			<FormGeneric data={dataForm} />
		</>
	);
};
