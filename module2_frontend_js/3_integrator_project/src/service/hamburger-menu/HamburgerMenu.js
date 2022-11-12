import utils from "../../utils/Utils.js";
import localStorage from "../../repository/LocalStorage.js";

const hamburgerMenuToggle = document.getElementById("hamburger-menu-toggle");
const btnHamburgerMenu = document.getElementById("hamburger-menu-button");
const overlay = document.getElementById("overlay");
const btnCart = document.getElementById("btn-cart");
const cart = document.getElementById("cart");
const linkCloseSession = document.getElementById("link-close-session");
const linkHome = document.getElementById("link-home");
const containerUserProfile = document.getElementById("container-user-profile");
const body = document.querySelector("body");

export default new (class HamburgerMenu {
	#keyUserSessionLocalStorage = "userSession";

	#toggleMenu() {
		if (cart.classList.contains("open-cart")) {
			cart.classList.remove("open-cart");
			return;
		}
		overlay.classList.toggle("show-overlay");
	}

	#toggleCart() {
		cart.classList.toggle("open-cart");

		if (cart.classList.contains("open-cart")) {
			this.#disableScroll();
		} else {
			this.#enableScroll();
		}

		if (hamburgerMenuToggle.checked) {
			hamburgerMenuToggle.checked = false;
			return;
		}
		
		if (containerUserProfile.classList.contains("open-user-profile")) {
			containerUserProfile.classList.remove("open-user-profile");
			return;
		}

		overlay.classList.toggle("show-overlay");
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
	}

	// Scroll
	#enableScroll() {
		body.classList.remove("disable-scroll");
	}

	#closeMenu() {
		if (!hamburgerMenuToggle.checked) return;
		overlay.classList.remove("show-overlay");
		hamburgerMenuToggle.checked = false;
	}

	#scroll() {
		if (!overlay.classList.contains("show-overlay")) return;
		overlay.classList.remove("show-overlay");
	}

	#userLogout() {
		localStorage.remove(this.#keyUserSessionLocalStorage);
		location.reload();
	}

	#clickLinkLogout() {
		utils.showModalConfirm(
			"¿Desea cerrar sesión?",
			() => {
				this.#userLogout();
			},
			""
		);
	}

	// Events
	#eventsClick() {
		btnHamburgerMenu.addEventListener("click", () => {
			this.#toggleMenu();
		});

		overlay.addEventListener("click", () => {
			this.#closeMenu();
		});

		btnCart.addEventListener("click", () => {
			this.#toggleCart();
		});

		linkHome.addEventListener("click", () => {
			document.location.href = "#main";
			this.#closeMenu();
		});

		linkCloseSession.addEventListener("click", () => {
			this.#clickLinkLogout();
		});
	}

	init() {
		this.#eventsClick();
	}
})();
