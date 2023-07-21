export default class Recipe {
	id: number;
	name: string;
	description: string;
	img: string;
	publisher: string;
	isFavorite: boolean;
	category: string;
	ingredients: string[];
	instructions: string[];

	constructor(
		id: number,
		name: string,
		description: string,
		img: string,
		publisher: string,
		isFavorite: boolean,
		category: string,
		ingredients: string[],
		instructions: string[]
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.img = img;
		this.publisher = publisher;
		this.isFavorite = isFavorite;
		this.category = category;
		this.ingredients = ingredients;
		this.instructions = instructions;
	}
}
