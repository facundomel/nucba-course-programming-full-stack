import Modal from "./Modal.js";

var snackbar = document.getElementById("snackbar");
var identificationTimeout = "";

export default new (class Utils {
	showSnackbar(message, backgroundColor) {
		if (snackbar.classList.contains("show")) {
			snackbar.classList.remove("show");
			clearTimeout(identificationTimeout);
			setTimeout(() => {
				this.showSnackbar(message, backgroundColor);
			}, 200);
			return;
		}

		snackbar.innerText = message;
		snackbar.setAttribute("style", backgroundColor);
		snackbar.classList.add("show");
		identificationTimeout = setTimeout(() => {
			snackbar.classList.remove("show");
		}, 3000);
	}

	showModalConfirm(message, success, cancel) {
		Modal.confirm(message, success, cancel);
	}

	showAlert(message, success) {
		Modal.alert(message, success);
	}

	showAlertButtonRight(message, success) {
		Modal.alertButtonRight(message, success);
	}

	showLoginUser(success, cancel, registerUser) {
		Modal.loginUser(success, cancel, registerUser);
	}

	showRegisterUser(success, cancel) {
		Modal.registerUser(success, cancel);
	}

	getIntegersAndDecimalsOfPrices(number) {
		let splitNum = number.split(",");
		return splitNum;
	}

	showMessageError(input, message) {
		input.classList.remove("input-success");
		input.classList.add("input-error");
		let formGroup = input.parentElement;
		let elementForMessage = formGroup.lastElementChild;
		elementForMessage.innerText = message;
	}

	showMessageSuccess(input) {
		input.classList.remove("input-error");
		// input.classList.add("input-success");
		let  formGroup = input.parentElement;
		let elementForMessage = formGroup.lastElementChild;
		elementForMessage.innerText = "";
	}

	clearMessageErrorAndSuccess(input) {
		input.classList.remove("input-error");
		input.classList.remove("input-success");
		input.value = "";
		let formGroup = input.parentElement;
		let elementForMessage = formGroup.lastElementChild;
		elementForMessage.innerText = "";
	}
})();
