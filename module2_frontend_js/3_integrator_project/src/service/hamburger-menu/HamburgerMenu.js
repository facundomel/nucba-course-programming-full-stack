const hamburgerMenuToggle = document.getElementById("hamburger-menu-toggle");
const btnHamburgerMenu = document.getElementById("hamburger-menu-button");
const overlay = document.getElementById("overlay");
const btnCart = document.getElementById("btn-cart");
const cart = document.getElementById("cart");
const linkProfile = document.getElementById("link-profile");
const linkHome = document.getElementById("link-home");

export default new (class HamburgerMenu {
	#toggleMenu() {
		if (cart.classList.contains("open-cart")) {
			cart.classList.remove("open-cart");
			return;
		}
		overlay.classList.toggle("show-overlay");
	}

	#toggleCart() {
		cart.classList.toggle("open-cart");
		if (hamburgerMenuToggle.checked) {
			hamburgerMenuToggle.checked = false;
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

		btnCart.addEventListener("click", () => {
			this.#toggleCart();
		});

		linkHome.addEventListener("click", () => {
			document.location.href = "#main";
			this.#closeMenu();
		});

		linkProfile.addEventListener("click", () => {
			this.#closeMenu();
		});
	}

	#eventsScroll() {
		window.addEventListener("scroll", () => {
			this.#closeMenu();
		});

		document.addEventListener("scroll", () => {
			this.#scroll();
		});
	}

	init() {
		this.#eventsClick();
		this.#eventsScroll();
	}
})();
