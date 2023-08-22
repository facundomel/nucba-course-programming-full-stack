import utils from "../../utils/Utils.js";
import localStorage from "../../repository/LocalStorage.js";
import UserModel from "../../model/User.js";

const overlay = document.getElementById("overlay");
const btnUserProfile = document.getElementById("btn-user-profile");
const containerUserProfile = document.getElementById("container-user-profile");
const btnLogout = document.getElementById("btn-logout");
const body = document.querySelector("body");
const cart = document.getElementById("cart");

export default new (class UserProfile {
	#keyDataUserLocalStorage = "dataUser";
	#dataUserLocalStorage = localStorage.get(this.#keyDataUserLocalStorage) || [];
	#keyUserSessionLocalStorage = "userSession";
	#userSessionLocalStorage = localStorage.get(this.#keyUserSessionLocalStorage) || [];

	#showLoginUser() {
		if (this.#userSessionLocalStorage.length == 0) {
			this.#disableScroll();

			utils.showLoginUser(
				() => {
					if (this.#loginUser()) return true;
					else return false;
				},
				"",
				() => {
					this.#showRegisterUser();
				}
			);
		}
	}

	#loginUser() {
		const inputUsername = document.getElementById("input-username-login");
		const inputPassword = document.getElementById("input-password-login");

		if (inputUsername.value != "" && inputPassword.value != "") {
			const user = this.#dataUserLocalStorage.filter((user) => {
				return user.username == inputUsername.value && user.password == inputPassword.value;
			});

			if (user.length == 0) {
				utils.showSnackbar(`Usuario o password incorrecto`, "background-color: var(--red-light)");
				utils.showInputsError(inputUsername, inputPassword);
				inputUsername.focus();
			} else {
				this.#userSessionLocalStorage = user;
				localStorage.save(this.#keyUserSessionLocalStorage, this.#userSessionLocalStorage);
				utils.showSnackbar(`¡Bienvenido ${inputUsername.value}!`, "background-color: var(--green-light)");
				return true;
			}
		} else if (inputUsername.value == "") {
			utils.showMessageError(inputUsername, "El username es obligatorio");
			inputUsername.focus();
		} else if (inputPassword.value == "") {
			utils.showMessageError(inputPassword, "El password es obligatorio");
			inputPassword.focus();
		}

		return false;
	}

	#showRegisterUser() {
		utils.showRegisterUser(
			() => {
				if (this.#registerUser()) return true;
				else return false;
			},
			() => {
				location.reload();
			}
		);
	}

	#registerUser() {
		const inputName = document.getElementById("input-name");
		const inputLastname = document.getElementById("input-lastname");
		const inputEmail = document.getElementById("input-email");
		const inputUsername = document.getElementById("input-username-register");
		const inputPassword = document.getElementById("input-password-register");

		if (
			inputName.value != "" &&
			inputLastname.value != "" &&
			inputEmail.value != "" &&
			inputUsername.value != "" &&
			inputPassword.value != ""
		) {
			const existUsername = this.#dataUserLocalStorage.some((user) => {
				return user.username == inputUsername.value;
			});

			if (!this.#validEmail(inputEmail) && !this.#validPasswordRegister(inputPassword)) {
				utils.showMessageError(inputEmail, "El email es inválido");
				utils.showMessageError(
					inputPassword,
					"El password debe contener como mínimo una letra minúscula, una mayúscula y un total de 8 caracteres"
				);
				inputEmail.focus();
			} else if (!this.#validEmail(inputEmail)) {
				utils.showMessageError(inputEmail, "El email es inválido");
				inputEmail.focus();
			} else if (!this.#validPasswordRegister(inputPassword)) {
				utils.showMessageError(
					inputPassword,
					"El password debe contener como mínimo una letra minúscula, una mayúscula y un total de 8 caracteres"
				);
				inputPassword.focus();
			} else if (existUsername) {
				utils.showSnackbar(`El usuario ya existe`, "background-color: var(--red-light)");
				inputUsername.focus();
			} else {
				let newUserId = 1;
				if (this.#dataUserLocalStorage.length > 0)
					newUserId = Number(this.#dataUserLocalStorage[this.#dataUserLocalStorage.length - 1].id) + 1;

				this.#dataUserLocalStorage = [...this.#dataUserLocalStorage, new UserModel(newUserId, inputUsername.value, inputPassword.value)];
				localStorage.save(this.#keyDataUserLocalStorage, this.#dataUserLocalStorage);
				utils.showSnackbar(`¡Registrado correctamente!`, "background-color: var(--green-light)");
				return true;
			}
		} else if (inputName.value == "") {
			utils.showMessageError(inputName, "El nombre es obligatorio");
			inputName.focus();
		} else if (inputLastname.value == "") {
			utils.showMessageError(inputLastname, "El apellido es obligatorio");
			inputLastname.focus();
		} else if (inputEmail.value == "") {
			utils.showMessageError(inputEmail, "El email es obligatorio");
			inputEmail.focus();
		} else if (inputUsername.value == "") {
			utils.showMessageError(inputUsername, "El username es obligatorio");
			inputUsername.focus();
		} else if (inputPassword.value == "") {
			utils.showMessageError(inputPassword, "El password es obligatorio");
			inputPassword.focus();
		}

		return false;
	}

	#validEmail(input) {
		const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
		const emailValue = input.value;
		if (!regex.test(emailValue)) {
			return false;
		} else {
			return true;
		}
	}

	#validPasswordRegister(input) {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
		const passwordValue = input.value;
		if (!regex.test(passwordValue)) {
			return false;
		} else {
			return true;
		}
	}

	#userLogout() {
		localStorage.remove(this.#keyUserSessionLocalStorage);
		location.reload();
	}

	#clickButtonLogout() {
		utils.showModalConfirm(
			"¿Desea cerrar sesión?",
			() => {
				this.#userLogout();
			},
			""
		);
	}

	#toggleUserProfile() {
		containerUserProfile.classList.toggle("open-user-profile");

		if (containerUserProfile.classList.contains("open-user-profile")) {
			this.#disableScroll();
		} else {
			this.#enableScroll();
		}

		if (cart.classList.contains("open-cart")) {
			cart.classList.remove("open-cart");
			return;
		}

		overlay.classList.toggle("show-overlay");
	}

	#closeUserProfileAndOverlay() {
		containerUserProfile.classList.remove("open-user-profile");
		overlay.classList.remove("show-overlay");
		this.#enableScroll();
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
	}

	#enableScroll() {
		body.classList.remove("disable-scroll");
	}

	// Events
	#eventsClick() {
		btnUserProfile.addEventListener("click", () => {
			this.#toggleUserProfile();
		});

		btnLogout.addEventListener("click", () => {
			this.#clickButtonLogout();
		});

		overlay.addEventListener("click", () => {
			this.#closeUserProfileAndOverlay();
		});
	}

	// Init
	init() {
		this.#showLoginUser();
		this.#eventsClick();
	}
})();
