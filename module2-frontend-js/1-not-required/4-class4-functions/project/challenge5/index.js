// Variables
let num1 = 1;
let num2 = 4;

// Funciones
function showRangeOfNumbers(num1, num2) {
	if (typeof num1 != "number" || typeof num2 != "number") {
		console.log("Los valores ingresados deben ser números");
		return;
	}

	if (num1 < num2) {
		if (num1 != num2) {
			console.log(`Números entre ${num1} y ${num2}`);
			for (let i = num1; i <= num2; i++) {
				console.log(i);
			}
		} else {
      console.log("Ambos números son iguales");
    }
	} else {
		console.log(`El número 1 (${num1}) tiene que ser menor que el número 2 (${num2})`);
	}
}

// Invocación de funciones
showRangeOfNumbers(num1, num2);
