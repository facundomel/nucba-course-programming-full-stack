import React, { createContext, useEffect, useRef, useState } from "react";
import localStoragePokemon from "../repository/LocalStoragePokemon";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
	const keyLocalStorage = "pokemon";
	const refInputPokemon = useRef(null);
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		setPokemon(localStoragePokemon.getPokemon(keyLocalStorage) || null);
	}, []);

	const handlerAddPokemon = (newPokemon) => {
		setPokemon(newPokemon);
	};

	const handlerFocusInputPokemon = () => {
		refInputPokemon.current.focus();
	};

	const data = { pokemon, setPokemon, handlerAddPokemon, refInputPokemon, handlerFocusInputPokemon };

	return <PokemonContext.Provider value={data}>{children}</PokemonContext.Provider>;
};
