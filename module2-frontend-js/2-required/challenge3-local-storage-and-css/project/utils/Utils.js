const messageError = document.getElementById("message-error");
const inputPizzaId = document.getElementById("input-pizza-id");

export default new (class Utils {
	showError(message) {
		inputPizzaId.classList.remove("input-success");
		inputPizzaId.classList.add("input-error");
		messageError.innerText = message;
	}

	showSuccess() {
		inputPizzaId.classList.remove("input-error");
		inputPizzaId.classList.add("input-success");
		messageError.innerText = "";
	}

	clearErrorAndSuccess() {
		inputPizzaId.classList.remove("input-error");
		inputPizzaId.classList.remove("input-success");
		inputPizzaId.value = "";
		messageError.innerText = "";
	}
})();
