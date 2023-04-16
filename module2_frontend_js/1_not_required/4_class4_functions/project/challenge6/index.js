// Variables
let num1 = 2;
let num2 = 4;

// Funciones
function sum(num1, num2) {
	if (typeof num1 != "number" || typeof num2 != "number") {
		console.log("Los valores ingresados deben ser números");
		return;
	}
	console.log("Suma de números");
	console.log(`${num1} + ${num2} = ${num1 + num2}`);
}

function subs(num1, num2) {
	if (typeof num1 != "number" || typeof num2 != "number") {
		console.log("Los valores ingresados deben ser números");
		return;
	}
	console.log("Resta de números");
	console.log(`${num1} - ${num2} = ${num1 - num2}`);
}

function mult(num1, num2) {
	if (typeof num1 != "number" || typeof num2 != "number") {
		console.log("Los valores ingresados deben ser números");
		return;
	}
	console.log("Multiplicación de números");
	console.log(`${num1} * ${num2} = ${num1 * num2}`);
}

function div(num1, num2) {
	if (typeof num1 != "number" || typeof num2 != "number") {
		console.log("Los valores ingresados deben ser números");
		return;
	}

	if (num2 != 0) {
		console.log("División de números");
		console.log(`${num1} / ${num2} = ${num1 / num2}`);
	} else {
		console.log("El divisor no puede ser 0");
	}
}

function showResult(num1, num2, fn) {
	fn(num1, num2);
}

// Invocación de funciones
showResult(num1, num2, div);
