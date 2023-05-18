const iceCream = [
  "Dulce de leche",
  "Chocolate blanco",
  "Coco",
  "Granizado",
  "Marroc"
]

function orderArrayAndAddLastElementAtStartArray(newElement) {
  iceCream.unshift(iceCream.pop());
  iceCream.push(newElement);
  return iceCream;
}

console.log(orderArrayAndAddLastElementAtStartArray("Chocolate"));