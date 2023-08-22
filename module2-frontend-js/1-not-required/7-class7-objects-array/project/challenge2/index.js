const iceCream = [
  "Dulce de leche",
  "Chocolate blanco",
  "Coco",
  "Granizado",
  "Marroc"
]

function addFirstElementAtEndArray() {
  iceCream.push(iceCream.shift());
  return iceCream;
}

console.log(addFirstElementAtEndArray());