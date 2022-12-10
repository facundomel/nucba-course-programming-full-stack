import React, { useContext, useRef, useState } from "react";
import LocalStorage from "../../../repository/LocalStorage";
import pokeApiService from "../../../service/PokeAPIService";
import Pokemon from "../../../model/Pokemon";
import { PokeAPIContext } from "../../../contexts/PokeAPIContext";
import FormModel from "../../../model/FormModel";
import { Form } from "../../shared/comp/form/Form";

export const FormPokeAPI = () => {
	const { handleAddPokemon, refInputPokemon, handleFocusInputPokemon } = useContext(PokeAPIContext);
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
			handleAddPokemon(newPokemon);
			LocalStorage.save("pokemon", newPokemon);
			setPokemonId("");
			handleFocusInputPokemon();
		}
	};

	const handlerOnChangeInput = (e) => {
		setPokemonId(e.target.value);
		handlerSetMessageNotExistPokemon("");
	};

	const handlerDisableButton = () => {
		return (!pokemonId || isNaN(pokemonId)) ? true : false;
	};

	const handlerMessageError = () => {
		return messageError && <small>{messageError}</small>;
	};

	const handlerMessagePokemonID = () => {
		if (pokemonId && isNaN(pokemonId))
			return <small>El Pokemon ID debe ser un número</small>
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
			<Form data={dataForm} />
		</>
	);
};
