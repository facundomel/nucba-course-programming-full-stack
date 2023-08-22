const num1 = 2;
const num2 = 5;
const arrayNum = [0, 1, 2, 3, 4, 5, 6];

function getArrayWithNumsThatAreInOtherArray(num1, num2, arrayNum) {
  let result = [];
  arrayNum.forEach(element => {
    if (element > num1 && element < num2)
      result.push(element);
  });
  return result;
}

console.log(`Números del array que estén entre ${num1} y ${num2}`);
console.log(getArrayWithNumsThatAreInOtherArray(num1, num2, arrayNum));