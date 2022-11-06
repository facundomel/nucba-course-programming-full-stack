import utils from "../../utils/Utils.js";
import localStorage from "../../repository/LocalStorage.js";
import UserModel from "../../model/User.js";

const btnUser = document.getElementById("btn-user");
const body = document.querySelector("body");

export default new (class User {
	#keyLocalStorage = "dataUser";
	#dataUserLocalStorage = localStorage.get(this.#keyLocalStorage) || {};

	#showLoginUser() {
		this.#disableScroll();

		utils.showLoginUser(
			() => {
				this.#successLoginUser();
			},
			"",
			() => {
				this.#registerUser();
			}
		);
	}

	#successLoginUser() {
		const inputUsername = document.getElementById("input-username");
		const inputPassword = document.getElementById("input-password");

		localStorage.save(this.#keyLocalStorage, new UserModel(inputUsername.value, inputPassword.value));
	}

	#registerUser() {
		const linkRegisterUser = document.getElementById("register-user");

		utils.showRegisterUser(
			() => {
				this.#successRegisterUser();
			},
			() => {
				this.#showLoginUser();
			}
		);
	}

	#successRegisterUser() {
		console.log("first");
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
	}

	// Events
	#eventLoginUser() {
		btnUser.addEventListener("click", () => {
			this.#showLoginUser();
		});
	}

	// Init
	init() {
		this.#eventLoginUser();
	}
})();
