import utils from "../utils/Utils.js";

const moreProductsInCart = document.getElementById("more-products");
const btnMoreProductsInHome = document.getElementById("btn-more");
const btnProfile = document.getElementById("profile");
const footerLinks = document.querySelectorAll(".footer-link");
const body = document.querySelector("body");

export default new (class Other {
	// Generic message of not having created some functionalities
	#showAlertNotFunctionality() {
		utils.showAlert("¡Lo sentimos! Esta funcionalidad aún no ha sido desarrollada.", () => {});
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
	}

	// Events
	#eventShowMoreProductsInCart() {
		moreProductsInCart.addEventListener("click", () => {
			this.#disableScroll();
			this.#showAlertNotFunctionality();
		});
	}

	#eventShowMoreProductsInHome() {
		btnMoreProductsInHome.addEventListener("click", () => {
			this.#disableScroll();
			this.#showAlertNotFunctionality();
		});
	}

	#eventProfile() {
		btnProfile.addEventListener("click", () => {
			this.#disableScroll();
			this.#showAlertNotFunctionality();
		});
	}

	#eventFooterLinks() {
		footerLinks.forEach((item) => {
			item.addEventListener("click", () => {
				this.#disableScroll();
				this.#showAlertNotFunctionality();
			});
		});
	}

	// Init
	init() {
		this.#eventShowMoreProductsInCart();
		this.#eventShowMoreProductsInHome();
		this.#eventProfile();
		this.#eventFooterLinks();
	}
})();
