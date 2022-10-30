export default class Product {
	constructor(id, name, description, price, img, category, offer, oldPrice, quantity) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.img = img;
		this.category = category;
		this.offer = offer;
		this.oldPrice = oldPrice;
		this.quantity = quantity;
	}

	static createProductForCart(product) {
		return new Product(
			product.id,
			product.name,
			product.description,
			product.price,
			product.img,
			product.category,
			product.offer,
			product.oldPrice,
			1
		);
	}
}
