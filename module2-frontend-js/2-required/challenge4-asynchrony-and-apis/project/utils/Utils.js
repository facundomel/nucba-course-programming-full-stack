const messageError = document.getElementById("message-error");
const inputPokemonId = document.getElementById("input-pokemon-id");

export default new (class Utils {
	showError(message) {
		inputPokemonId.classList.remove("input-success");
		inputPokemonId.classList.add("input-error");
		messageError.innerText = message;
	}

	showSuccess() {
		inputPokemonId.classList.remove("input-error");
		inputPokemonId.classList.add("input-success");
		messageError.innerText = "";
	}

	clearErrorAndSuccess() {
		inputPokemonId.classList.remove("input-error");
		inputPokemonId.classList.remove("input-success");
		inputPokemonId.value = "";
		messageError.innerText = "";
	}
})();
