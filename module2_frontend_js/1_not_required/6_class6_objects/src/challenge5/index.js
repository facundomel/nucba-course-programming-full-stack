import Shoe from "./model/Shoe.js";

const shoe1 = new Shoe("41", "Negras y rojas", "Nike", 6500);
const shoe2 = new Shoe("40", "Gris", "Adidas", 6500);

function priceComparator(shoe1, shoe2) {
  if (shoe1.price > shoe2.price) {
    return `La zapatilla ${shoe1.brand} es la más cara del mercado, con un valor de ${shoe1.price}`;
  } else if (shoe1.price < shoe2.price) {
    return `La zapatilla ${shoe2.brand} es la más cara del mercado, con un valor de ${shoe2.price}`;
  } else {
    return `Las zapatillas de ambas marcas son las más caras del mercado, con un valor de ${shoe1.price}`;
  }
}

console.log(priceComparator(shoe1, shoe2));