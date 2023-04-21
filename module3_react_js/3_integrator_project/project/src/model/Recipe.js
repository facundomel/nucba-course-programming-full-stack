export default class Recipe {
	constructor(id, name, description, img, user, isFavorite, category) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.img = img;
		this.user = user;
		this.isFavorite = isFavorite;
		this.category = category;
	}
}
