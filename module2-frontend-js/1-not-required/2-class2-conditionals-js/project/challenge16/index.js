const num1 = prompt("Ingresa el primer valor numérico");
const num2 = prompt("Ingresa el segundo valor numérico");

if (num1 > num2) {
  console.log(`${num1} es mayor que ${num2}`);
} else if (num1 < num2) {
  console.log(`${num1} es menor que ${num2}`);
} else {
  console.log(`${num1} y ${num2} son iguales`);
}