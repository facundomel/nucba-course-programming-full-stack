import Pizza from "./model/Pizza.js";
import { default as utils } from "./utils/Utils.js";
import { default as pizzaRepository } from "./repository/LocalStorage.js";

// Constants
const cardsPizza = document.getElementById("cards-pizza");
const card = document.getElementById("card");
const form = document.getElementById("form");
const inputPizzaId = document.getElementById("input-pizza-id");
const buttonGetPizza = document.getElementById("button-get-pizza");
const buttonClearLocalStorage = document.getElementById("button-clear-local-storage");
const pizzaLocalStorage = pizzaRepository.get("pizza") || null;

// Array de objetos de tipo Pizza
const pizzas = [
	new Pizza(1, "Muzarella", ["Aceituna"], 950, "./assets/pizzas/mozzarella.jpg"),
	new Pizza(2, "Especial", ["Jamón cocido", "Morrón", "Aceituna"], 1100, "./assets/pizzas/especial.jpg"),
	new Pizza(3, "Napolitana", ["Tomate"], 1150, "./assets/pizzas/napolitana.jpg"),
	new Pizza(4, "Calabresa", ["Longaniza"], 1250, "./assets/pizzas/calabresa.jpg"),
	new Pizza(5, "Fugazzeta", ["Cebolla", "Aceituna"], 1000, "./assets/pizzas/fugazzeta.jpg"),
	new Pizza(6, "Tropical", ["Jamón cocido", "Ananá"], 1250, "./assets/pizzas/tropical.jpg"),
];

// Functions
function validInputPizzaId() {
	if (inputPizzaId.value == "") utils.clearErrorAndSuccess();
}

function debounce(callback, timeout = 5000) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, timeout);
	};
}

function getPizzaById() {
	if (inputPizzaId.value != "") {
		const pizza = pizzas.find((pizza) => {
			return pizza.id == inputPizzaId.value;
		});
		if (pizza != undefined) {
			utils.showSuccess();
			pizzaRepository.save("pizza", pizza);
			renderPizza(pizza);
		} else {
			utils.showError("La pizza no existe");
		}
	} else {
		utils.showError("Debe completar este campo");
	}
	inputPizzaId.focus();
}

function renderPizza(pizza) {
	if (pizza != null) {
		cardsPizza.classList.add("cards-pizza");
		cardsPizza.classList.remove("cards-pizza-none");
		card.innerHTML = `<img src=${pizza.image} class="card-img-top" alt=${pizza.name}>
		<div class="card-body">
			<div>
				<h5 class="card-title">${pizza.name}</h5>
				<div class="card-text">
					<p>Ingredientes: ${pizza.ingredients.join(", ")}</p>
					<p>Precio: $${pizza.price}</p>
				</div>
			</div>
		</div>`;
	} else {
		cardsPizza.classList.add("cards-pizza-none");
		cardsPizza.classList.remove("cards-pizza");
		card.innerHTML = "";
	}
}

// Events
function eventInputChange() {
	form.addEventListener(
		"input",
		debounce((e) => {
			switch (e.target.id) {
				case "input-pizza-id":
					validInputPizzaId();
					break;
			}
		})
	);
}

function eventButtonGetPizza() {
	buttonGetPizza.addEventListener("click", (e) => {
		e.preventDefault();
		getPizzaById();
	});
}

function eventButtonClearLocalStorage() {
	buttonClearLocalStorage.addEventListener("click", (e) => {
		e.preventDefault();
		if (pizzaRepository.get("pizza") != null) {
			pizzaRepository.remove("pizza");
			renderPizza(null);
			utils.clearErrorAndSuccess();
		} else {
			utils.showError("No hay nada para limpiar");
		}
		inputPizzaId.focus();
	});
}

// Init
function init() {
	renderPizza(pizzaLocalStorage);
	eventInputChange();
	eventButtonGetPizza();
	eventButtonClearLocalStorage();
}

init();
