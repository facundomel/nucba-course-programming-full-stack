export default class Pokemon {
	private id: number;
	private name: string;

	constructor(pokemon: any) {
		this.id = pokemon.id;
		this.name = pokemon.name;
	}
}
