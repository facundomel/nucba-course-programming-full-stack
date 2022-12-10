import axios from "axios";

export default new (class PokemonService {
	async getPokemonById(pokemonId) {
		try {
			const result = await axios.get(`http://localhost:3006/pokemons/${pokemonId}`);
			return result.data;
		} catch (error) {
			throw error;
		}
	}
})();
