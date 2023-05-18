const num = 2;
const arrayNum = [0, 1, 2, 3, 15, 5, 38];

function sum(num1, num2) {
	if (typeof num1 == "number" && typeof num2 == "number") {
		return num1 + num2;
	}
  return "Los valores ingresados deben ser números";
}

function subs(num1, num2) {
	if (typeof num1 == "number" && typeof num2 == "number") {
		return num1 - num2;
	}
	return "Los valores ingresados deben ser números";
}

function mult(num1, num2) {
	if (typeof num1 == "number" && typeof num2 == "number") {
		return num1 * num2;
	}
	return "Los valores ingresados deben ser números";
}

function div(num1, num2) {
	if (typeof num1 == "number" && typeof num2 == "number") {
    if (num2 != 0) {
      return num1 / num2;
    } else {
      return "El divisor no puede ser 0";
    }
  }
  return "Los valores ingresados deben ser números";
}

function getNumsArrayModifiedForOperationMathematic(arrayNum, num, callback) {
  switch (callback) {
    case sum:
      console.log("Suma:");
      break;
    case subs:
      console.log("Resta:");
      break;
    case mult:
      console.log("Multiplicación:");
      break;
    case div:
      console.log("División:");
      break;
    default:
      console.log("Operación incorrecta");
      break;
  }

	return arrayNum.map((item) => {
    return callback(item, num);
  })
}

console.log(getNumsArrayModifiedForOperationMathematic(arrayNum, num, mult));
