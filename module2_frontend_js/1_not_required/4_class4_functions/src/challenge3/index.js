// Variables
let num1 = 1;
let num2 = 4;

// Funciones
function multAndSumNumbers(num1, num2) {
  if (typeof num1 != "number" || typeof num2 != "number") {
    console.log("Los valores ingresados deben ser números");
    return;
  }
  console.log(`${num1}*2 + ${num2}*2 = ${num1*2+num2*2}`);
}

// Invocación de funciones
multAndSumNumbers(num1, num2);