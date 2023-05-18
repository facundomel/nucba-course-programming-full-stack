const iceCream = [
  "Dulce de leche",
  "Chocolate blanco",
  "Coco",
  "Granizado",
  "Marroc"
]

function getOnlyThreeLetterInUpperCaseEachIceCream(iceCream) {
  let finalIceCream = [];
  iceCream.forEach((e) => {
    finalIceCream.push(e.slice(0, 3).toUpperCase());
  })
  return finalIceCream;
}

console.log(getOnlyThreeLetterInUpperCaseEachIceCream(iceCream));