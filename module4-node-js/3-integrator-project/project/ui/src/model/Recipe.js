export default class Recipe {
	constructor(id = 0, title = "", description = "", urlImage = "", ingredients = "", instructions = "", userId = "", categoryId = "") {
		this.id = id;
		this.title = title;
		this.description = description;
		this.urlImage = urlImage;
		this.ingredients = ingredients;
		this.instructions = instructions;
		this.userId = userId;
		this.categoryId = categoryId;
	}
}
