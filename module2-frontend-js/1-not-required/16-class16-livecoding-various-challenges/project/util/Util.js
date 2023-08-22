export default new (class Util {
	showError(input, message) {
		const parentInput = input.parentElement;
		const messageError = parentInput.querySelector("small");
		parentInput.classList.add("error");
		parentInput.classList.remove("success");
		messageError.textContent = message;
		input.focus();
	}

	showSuccess(input) {
		const parentInput = input.parentElement;
		const messageError = parentInput.querySelector("small");
		parentInput.classList.remove("error");
		parentInput.classList.add("success");
		messageError.textContent = "";
	}

	showErrorV2(parentInput, message) {
		const messageError = parentInput.querySelector("small");
		parentInput.classList.add("error");
		messageError.textContent = message;
	}

	showSuccessV2(parentInput) {
		const messageError = parentInput.querySelector("small");
		parentInput.classList.remove("error");
		messageError.textContent = "";
	}

	clearStyleShowMessage(input) {
		const parentInput = input.parentElement;
		const messageError = parentInput.querySelector("small");
		parentInput.classList.remove("error");
		parentInput.classList.remove("success");
		messageError.textContent = null;
	}

	formReset(form, input) {
		for (let i = 0; i < form.elements.length; i++) {
			if (form.elements[i].localName == "input") {
				this.clearStyleShowMessage(form.elements[i]);
				form.reset();
			}
		}
		input.focus();
	}
})();
