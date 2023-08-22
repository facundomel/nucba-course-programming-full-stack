// Variables
let num = 2;

// Funciones
function showMultiplicationTable(num) {
  if (typeof num != "number") {
    console.log("El valor ingresado debe ser un número");
    return;
  }

  console.log(`Tabla de multiplicación del 1 al 10 del número ${num}`);
  for (let i = 1; i <= 10; i++) {
    console.log(`${num} * ${i} = ${num*i}`);
  }
}

// Invocación de funciones
showMultiplicationTable(num);