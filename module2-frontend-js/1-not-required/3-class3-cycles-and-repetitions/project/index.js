let myArray = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

console.log("Todos los números del array");
for(let i = 0; i <= myArray.length-1; i++) {
  console.log(`Número ${i+1}: ${myArray[i]}`);
}

console.log("Los primeros cinco números del array");
for(let i=0; i <= myArray.length-1; i++) {
  console.log(`Número ${i+1}: ${myArray[i]}`);

  if (i == 4)
    break;
}

console.log("Los últimos cinco números del array");
for(let i = myArray.length-1; i >= 0; i--) {
  console.log(`Número ${i+1}: ${myArray[i]}`);

  if (i == 5)
    break;
}

console.log("Todos los números del array excepto el que está en la cuarta posición");
for(let i = 0; i <= myArray.length-1; i++) {
  if (i == 3)
    continue;

  console.log(`Número ${i+1}: ${myArray[i]}`);
}
