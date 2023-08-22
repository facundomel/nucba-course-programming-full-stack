export default class Pokemon {
	constructor(pokemon) {
		this.name = pokemon.name;
		this.types = pokemon.types;
		this.height = pokemon.height / 10;
		this.weight = pokemon.weight / 10;
		this.image = pokemon.sprites.other.home.front_default;
	}
}
