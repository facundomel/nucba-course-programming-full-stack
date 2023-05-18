const num = 37;
const arrayNum = [0, 1, 2, 3, 15, 5, 38];

function getFirstNumberGreaterThanOtherNumber(num, arrayNum) {
	const result = arrayNum.find((element) => element > num);
	if (result != undefined) 
    return result;
  return "No hay números mayores al número dado";
}

console.log(`Primer número del array mayor que ${num}`);
console.log(getFirstNumberGreaterThanOtherNumber(num, arrayNum));
