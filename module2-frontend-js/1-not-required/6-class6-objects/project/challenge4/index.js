import Shoe from "./model/Shoe.js";

function printShoes() {
  const shoe1 = new Shoe("41", "Negras y rojas", "Nike");
  const shoe2 = new Shoe("40", "Gris", "Adidas");

  console.log(shoe1.getInfo());
  console.log(shoe2.getInfo());
}

printShoes();