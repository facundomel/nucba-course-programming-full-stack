const numbers = [0, 1, 2, 3, 4];
const numbers2 = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function addMethodsArray() {
	Array.prototype.getEvenNumbers = function() {
		return this.filter((number) => {
			return number % 2 == 0;
		})
	}
}

function init() {
	addMethodsArray();

	console.log(numbers.getEvenNumbers());
	console.log(numbers2.getEvenNumbers());
}

init();
