import React, { createContext, useEffect, useRef, useState } from "react";
import LocalStorage from "../repository/LocalStorage";

export const PokeAPIContext = createContext();

export const PokeAPIProvider = ({ children }) => {
	const keyLocalStorage = "pokemon";
	const refInputPokemon = useRef(null);
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		setPokemon(LocalStorage.get(keyLocalStorage) || null);
	}, []);

	const handleAddPokemon = (newPokemon) => {
		setPokemon(newPokemon);
	};

	const handleFocusInputPokemon = () => {
		refInputPokemon.current.focus();
	};

	const data = { pokemon, setPokemon, handleAddPokemon, refInputPokemon, handleFocusInputPokemon };

	return <PokeAPIContext.Provider value={data}>{children}</PokeAPIContext.Provider>;
};
