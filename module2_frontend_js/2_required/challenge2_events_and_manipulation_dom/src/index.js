import Pizza from "./model/Pizza.js";

const inputPizzaId = document.getElementById("inputPizzaId");
const messageError = document.getElementById("messageError");
const pizzaName = document.getElementById("pizzaName");
const pizzaPrice = document.getElementById("pizzaPrice");
const buttonGetPizza = document.getElementById("buttonGetPizza");

// Array de objetos de tipo Pizza
const pizzas = [
	new Pizza(1, "Pizza 1", ["Tomate"], 500),
	new Pizza(2, "Pizza 2", ["Anchoas"], 1250),
	new Pizza(3, "Pizza 3", ["Paleta", "Aceitunas"], 1000),
	new Pizza(4, "Pizza 4", ["Queso roquefort"], 1100),
	new Pizza(5, "Pizza 5", ["Cebolla"], 890),
	new Pizza(6, "Pizza 6", ["Salame", "Aceitunas"], 900),
];

function showError(message) {
  pizzaName.innerText = "";
  pizzaPrice.innerText = "";
  inputPizzaId.classList.add("inputError");
  messageError.innerText = message;
}

function showSuccess() {
  inputPizzaId.classList.remove("inputError");
  messageError.innerText = "";
}

function getPizzaById() {
	if (inputPizzaId.value != "") {
		const pizza = pizzas.find((pizza) => {
			return pizza.id == inputPizzaId.value;
		});
		if (pizza != undefined) {
			pizzaName.innerText = pizza.name;
			pizzaPrice.innerText = `$${pizza.price}`;
      showSuccess();
		} else {
      showError("La pizza no existe");
		}
	} else {
    showError("Debe completar este campo");
  }
  inputPizzaId.focus();
}

function init() {
	buttonGetPizza.addEventListener("click", (e) => {
    e.preventDefault();
    getPizzaById();
  });
}

init();
