import Exercise1 from "./service/Exercise1.js";
import Exercise2 from "./service/Exercise2.js";
import Exercise3 from "./service/Exercise3.js";
import Exercise4 from "./service/Exercise4.js";

function init() {
	// Ejercicio 1
	Exercise1.hamburguerMenu();

	// Ejercicio 2
	Exercise2.eventClickSubmit();
	Exercise2.eventInputChanged();

	// Ejercicio 3
	Exercise3.renderAllTasks();
	Exercise3.eventClickSubmit();
	Exercise3.eventClickClearLocalStorage();
	Exercise3.eventInputChanged();

	// // Ejercicio 4
	Exercise4.eventClickRenderAllCards();
	Exercise4.eventClickHideAllCards();
}

init();