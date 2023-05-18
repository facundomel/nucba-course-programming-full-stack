import axios from "axios";
import Pokemon from "../model/Pokemon";

export default class PokemonService {
	static getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
		try {
			const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
			return new Pokemon(result.data);
		} catch (error: any) {
			throw error;
		}
	};
}
