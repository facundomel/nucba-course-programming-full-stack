const age = prompt("Ingrese una edad");

if (age < 13) {
  console.log("Soy un niño");
} else if (age >= 13 && age < 20) {
  console.log("Soy un adolescente");
} else if (age >= 20 && age < 50) {
  console.log("Soy un adulto");
} else if (age > 50) {
  console.log("Soy un adulto mayor");
}