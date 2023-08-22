const iceCream = [
  "Dulce de leche",
  "Chocolate blanco",
  "Coco",
  "Granizado",
  "Marroc"
]

const iceCream2 = [
  "Chocolate",
  "Vainilla",
  "Americana"
]

function getArrayConcatenated() {
  return iceCream.slice(iceCream.length-2).concat(iceCream2.slice(0, 2));
}

console.log(getArrayConcatenated());