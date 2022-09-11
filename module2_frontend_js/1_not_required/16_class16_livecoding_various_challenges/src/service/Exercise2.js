import Util from "../util/Util.js";

const formExercise2 = document.getElementById("formExercise2");
const email = document.getElementById("email");
const password = document.getElementById("pass");

let executeDebounce = true;

export default new (class Exercise2 {
	validEmail() {
		const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
		const emailValue = email.value;
		if (emailValue == "") {
			Util.showError(email, "El email es obligatorio");
		} else if (!regex.test(emailValue)) {
			Util.showError(email, "El email es inválido");
		} else {
			Util.showSuccess(email);
			return true;
		}
		return false;
	}

	validPassword() {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
		const passwordValue = password.value;
		if (passwordValue == "") {
			Util.showError(password, "El password es obligatorio");
		} else if (!regex.test(passwordValue)) {
			Util.showError(
				password,
				"El password tiene que tener una mayúscula, una minúscula, un número y debe tener una longitud de 8 o más caracteres"
			);
		} else {
			Util.showSuccess(password);
			return true;
		}
		return false;
	}

	eventClickSubmit() {
		formExercise2.addEventListener("submit", (e) => {
			e.preventDefault();
			if (this.validEmail() && this.validPassword()) {
				executeDebounce = false;
				Util.formReset(formExercise2, email);
			}
		});
	}

	debounce(callback, timeout=500) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				if (executeDebounce) {
					callback.apply(this, args);
				}
			}, timeout);
		};
	}

	eventInputChanged() {
		formExercise2.addEventListener(
			"input",
			this.debounce((e) => {
				switch (e.target.id) {
					case "email":
						this.validEmail();
						break;
					case "pass":
						this.validPassword();
						break;
				}
			})
		);
	}
})();
