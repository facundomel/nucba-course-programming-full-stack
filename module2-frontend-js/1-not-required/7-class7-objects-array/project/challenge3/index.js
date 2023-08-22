const iceCream = [
  "Dulce de leche",
  "Chocolate blanco",
  "Coco",
  "Granizado",
  "Marroc"
]

function getArrayReverseWithWordsSeparetedWithDash() {
  return iceCream.reverse().join("-");
}

console.log(getArrayReverseWithWordsSeparetedWithDash());