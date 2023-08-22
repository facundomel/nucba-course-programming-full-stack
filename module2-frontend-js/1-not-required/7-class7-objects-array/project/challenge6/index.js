const phrase = "            .levin us ed sojel yum atse isseM y odnum led rodaguj rojem le se odlanoR            ";

function correctPhrase() {
  return phrase.trim().split("").reverse().join("").replace("Messi", "Ronaldo").replace("Ronaldo", "Messi");
}

console.log("Frase original: ");
console.log(phrase);
console.log("Frase corregida: ");
console.log(correctPhrase());