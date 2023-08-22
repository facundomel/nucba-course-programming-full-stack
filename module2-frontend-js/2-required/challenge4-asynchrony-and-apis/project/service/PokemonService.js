export default new (class PokemonService {
	async getPokemonById(pokemonId) {
		try {
			const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
			return result.data;
		} catch (error) {
			throw error;
		}
	}
})();
