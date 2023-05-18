const num1 = 2;
const num2 = 5;
const arrayNum = [0, 1, 2, 3, 15, 5, 38];

function getArrayWithSomeNumsMultiplied(num1, num2, arrayNum) {
  let result = [];
  arrayNum.forEach(element => {
    if (element > num1)
      result.push(element * num2);
    else 
      result.push(element);
  });
  return result;
}

console.log("Nuevo array: ");
console.log(getArrayWithSomeNumsMultiplied(num1, num2, arrayNum));