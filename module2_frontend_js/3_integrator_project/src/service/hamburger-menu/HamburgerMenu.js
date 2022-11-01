const containerHumburgerMenu = document.querySelector(".container-hamburger-menu");
const btnHamburgerMenu = document.querySelector(".btn-hamburger-menu");
const overlay = document.querySelector(".overlay");
const btnCart = document.getElementById("btn-cart");
const cart = document.getElementById("cart");

export default new (class HamburgerMenu {
	#toggleMenu() {
		containerHumburgerMenu.classList.toggle("show-menu");
		// if (cart.classList.contains("open-cart")) {
		// 	cart.classList.remove("open-cart");
		// 	return;
		// }
		overlay.classList.toggle("show-overlay");
	}

	#toggleCart() {
		cart.classList.toggle("open-cart");
		if (containerHumburgerMenu.classList.contains("show-menu")) {
			containerHumburgerMenu.classList.remove("show-menu");
			return;
		}
		overlay.classList.toggle("show-overlay");
	}

	#closeMenu() {
		if (!containerHumburgerMenu.classList.contains("show-menu")) return;
		containerHumburgerMenu.classList.remove("show-menu");
		overlay.classList.remove("show-overlay");
	}

	#scroll() {
		if (!overlay.classList.contains("show-overlay")) return;
		overlay.classList.remove("show-overlay");
	}

	// Events
	#eventsClick() {
		btnHamburgerMenu.addEventListener("click", () => {
			this.#toggleMenu();
		});

		overlay.addEventListener("click", () => {
			this.#closeMenu();
		});

		// cartBtn.addEventListener("click", () => {
		// 	this.#toggleCart();
		// });
	}

	#eventsScroll() {
		window.addEventListener("scroll", () => {
			this.#closeMenu();
		});

		// document.addEventListener("scroll", () => {
		// 	this.#scroll();
		// });
	}

	init() {
		this.#eventsClick();
		this.#eventsScroll();
	}
})();
