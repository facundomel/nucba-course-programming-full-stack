const shoe1 = {
  size: "40",
  color: "Negras y rojas",
  brand: "Nike"
}

const shoe2 = {
  size: "41",
  color: "Gris",
  brand: "Adidas"
}

function shoeComparator(shoe1, shoe2) {
  if (shoe1.size > shoe2.size) {
    console.log(`El talle de la zapatilla ${shoe1.brand} es mayor que el de la zapatilla ${shoe2.brand}`); 
  } else if (shoe1.size < shoe2.size) {
    console.log(`El talle de la zapatilla ${shoe1.brand} es menor que el de la zapatilla ${shoe2.brand}`); 
  } else {
    console.log("Los talles de ambas zapatillas son iguales");
  }
}

shoeComparator(shoe1, shoe2);