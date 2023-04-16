numChar = 4;
const arrayWords = [
  "Agua",
  "Pepe",
  "Computadora",
  "Maní",
  "Campera"
];

function getFirstWordWithMoreFourCharacters(arrayWords) {
	const result = arrayWords.find((element) => element.length > numChar);
	if (result != undefined) 
    return result;
  return "No hay palabras que tengan más de 4 caracteres";
}

console.log(`Primera palabra del array con más de ${numChar} caracteres`);
console.log(getFirstWordWithMoreFourCharacters(arrayWords));
