import utils from "../../utils/Utils.js";
import localStorage from "../../repository/LocalStorage.js";
import UserModel from "../../model/User.js";

const btnUserProfile = document.getElementById("btn-user-profile");
const body = document.querySelector("body");

export default new (class User {
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

		utils.showMessageSuccess(inputUsername);
		utils.showMessageSuccess(inputPassword);

		if (inputUsername.value != "" && inputPassword.value != "") {
			const user = this.#dataUserLocalStorage.filter((user) => {
				return user.username == inputUsername.value && user.password == inputPassword.value;
			});

			if (user.length == 0) {
				utils.showSnackbar(`Usuario o password incorrecto`, "background-color: var(--red-light)");
				inputUsername.focus();
			} else {
				this.#userSessionLocalStorage = user;
				localStorage.save(this.#keyUserSessionLocalStorage, this.#userSessionLocalStorage);
				utils.showSnackbar(`¡Bienvenido ${inputUsername.value}!`, "background-color: var(--green-light)");
				return true;
			}
		} else if (inputUsername.value == "") {
			utils.showMessageError(inputUsername, "Debe completar este campo");
			inputUsername.focus();
		} else if (inputPassword.value == "") {
			utils.showMessageError(inputPassword, "Debe completar este campo");
			inputPassword.focus();
		}

		return false;
	}

	#showRegisterUser() {
		this.#disableScroll();

		utils.showRegisterUser(
			() => {
				if (this.#registerUser()) return true;
				else return false;
			},
			() => {
				this.#showLoginUser();
			}
		);
	}

	#registerUser() {
		const inputName = document.getElementById("input-name");
		const inputLastname = document.getElementById("input-lastname");
		const inputEmail = document.getElementById("input-email");
		const inputUsername = document.getElementById("input-username-register");
		const inputPassword = document.getElementById("input-password-register");

		utils.showMessageSuccess(inputName);
		utils.showMessageSuccess(inputLastname);
		utils.showMessageSuccess(inputEmail);
		utils.showMessageSuccess(inputUsername);
		utils.showMessageSuccess(inputPassword);

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

			if (existUsername) {
				utils.showSnackbar(`El usuario ya existe`, "background-color: var(--red-light)");
				inputName.focus();
			} else {
				// Ver como hicieron los profes para validar cada uno de los campos. Ademas ver porque puede ser que solo me almacene uno. Sino quizas deberia ponerlo en local o pasarlo como parametro nomas.
				let newUserId = 1;
				if (this.#dataUserLocalStorage.length > 0)
					newUserId = Number(this.#dataUserLocalStorage[this.#dataUserLocalStorage.length - 1].id) + 1;

				this.#dataUserLocalStorage = [...this.#dataUserLocalStorage, new UserModel(newUserId, inputUsername.value, inputPassword.value)];
				localStorage.save(this.#keyDataUserLocalStorage, this.#dataUserLocalStorage);
				utils.showSnackbar(`¡Registrado correctamente!`, "background-color: var(--green-light)");
				return true;
			}
		} else if (inputName.value == "") {
			utils.showMessageError(inputName, "Debe completar este campo");
			inputName.focus();
		} else if (inputLastname.value == "") {
			utils.showMessageError(inputLastname, "Debe completar este campo");
			inputLastname.focus();
		} else if (inputEmail.value == "") {
			utils.showMessageError(inputEmail, "Debe completar este campo");
			inputEmail.focus();
		} else if (inputUsername.value == "") {
			utils.showMessageError(inputUsername, "Debe completar este campo");
			inputUsername.focus();
		} else if (inputPassword.value == "") {
			utils.showMessageError(inputPassword, "Debe completar este campo");
			inputPassword.focus();
		}

		return false;
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
	}

	// Events
	#eventLoginUser() {
		btnUserProfile.addEventListener("click", () => {
			this.#showLoginUser();
		});
	}

	// Init
	init() {
		this.#showLoginUser();
		// this.#eventLoginUser();
	}
})();
