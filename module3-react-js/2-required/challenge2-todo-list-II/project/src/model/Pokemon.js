export default class Pokemon {
	constructor(pokemon) {
		this.id = pokemon.id;
		this.name = pokemon.name;
		this.img = pokemon.sprites.other.home.front_default;
	}
}
