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
		// containerUserProfile.classList.toggle("open-user-profile");
		// overlay.classList.toggle("show-overlay");
		containerUserProfile.classList.toggle("open-user-profile");
		if (cart.classList.contains("open-cart")) {
			cart.classList.remove("open-cart");
			return;
		}
		overlay.classList.toggle("show-overlay");
	}

	#closeUserProfileOnScroll() {
		if (!containerUserProfile.classList.contains("open-user-profile")) return;

		this.#closeUserProfileAndOverlay();
	}

	#closeUserProfileAndOverlay() {
		containerUserProfile.classList.remove("open-user-profile");
		overlay.classList.remove("show-overlay");
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
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

	#eventCloseUserprofileOnScroll() {
		window.addEventListener("scroll", () => {
			this.#closeUserProfileOnScroll();
		});
	}

	// Init
	init() {
		this.#showLoginUser();
		this.#eventsClick();
		this.#eventCloseUserprofileOnScroll();
	}
})();
