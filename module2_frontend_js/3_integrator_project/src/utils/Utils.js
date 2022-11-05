import Modal from "../model/Modal.js";

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

	getIntegersAndDecimalsOfPrices(number) {
		let splitNum = number.split(",");
		return splitNum;
	}
})();
