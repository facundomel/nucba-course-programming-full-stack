export default class Recipe {
	constructor(id, name, description, img, publisher, isFavorite, category, ingredients, instructions) {
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
