const iceCream = [
  "Dulce de leche",
  "Chocolate blanco",
  "Coco",
  "Granizado",
  "Marroc",
  "Almendrado"
]

function getWordWithLetterM(words) {
  let wordsWithLetterM = [];
  words.forEach(element => {
    if (element.toLowerCase().includes("m"))
      wordsWithLetterM.push(element);
  });
  return wordsWithLetterM;
}

console.log("Palabras que contienen letra m o M");
console.log(getWordWithLetterM(iceCream));