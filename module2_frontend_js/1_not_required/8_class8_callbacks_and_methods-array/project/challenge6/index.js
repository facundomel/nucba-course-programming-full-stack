const arrayNum = [0, 1, 2, 3, 15, 5, 38];

function getNumsArrayDuplicated(arrayNum) {
	return arrayNum.map((item) => {
    return item * 2;
  })
}

console.log(`Números del array duplicados:`);
console.log(getNumsArrayDuplicated(arrayNum));
