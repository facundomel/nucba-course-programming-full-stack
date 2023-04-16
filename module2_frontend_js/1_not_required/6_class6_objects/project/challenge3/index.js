import Shoe from "./model/Shoe.js";

function printShoes() {
	const shoe1 = new Shoe("41", "Negras y rojas", "Nike");
	const shoe2 = new Shoe("40", "Gris", "Adidas");

	console.log("Zapatilla 1");
	console.log(shoe1);
	console.log("Zapatilla 2");
	console.log(shoe2);
}

printShoes();
