import React, { createContext, useState } from "react";

export const PokeAPIContext = createContext();

export const PokeAPIProvider = ({ children }) => {
	const [pokemon, setPokemon] = useState(null);

	const handleAddPokemon = (newPokemon) => {
		setPokemon(newPokemon);
	};

	const data = { pokemon, setPokemon, handleAddPokemon };

	return <PokeAPIContext.Provider value={data}>{children}</PokeAPIContext.Provider>;
};
