const hamburgerMenuToggle = document.getElementById("hamburger-menu-toggle");
const btnHamburgerMenu = document.querySelector(".hamburger-menu-button");
const overlay = document.querySelector(".overlay");
const btnCart = document.getElementById("btn-cart");
const cart = document.getElementById("cart");

export default new (class HamburgerMenu {
	#toggleMenu() {
		// if (cart.classList.contains("open-cart")) {
		// 	cart.classList.remove("open-cart");
		// 	return;
		// }
		overlay.classList.toggle("show-overlay");
	}

	#toggleCart() {
		cart.classList.toggle("open-cart");
		if (hamburgerMenuToggle.classList.contains("show-menu")) {
			hamburgerMenuToggle.classList.remove("show-menu");
			return;
		}
		overlay.classList.toggle("show-overlay");
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
