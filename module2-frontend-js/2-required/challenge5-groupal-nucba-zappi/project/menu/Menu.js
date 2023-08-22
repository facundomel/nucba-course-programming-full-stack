import utils from "../utils/Utils.js";

const barsBtn = document.querySelector(".btn-menu-navbar");
const overlay = document.querySelector(".overlay");
const menuResponsive = document.querySelector(".responsive-menu");
const cartBtn = document.getElementById("btn-cart");
const cart = document.getElementById("cart");
const body = document.querySelector("body");

// Generic message of not having created some functionalities
function showAlertNotFunctionality() {
	utils.showAlert("¡Lo sentimos! Esta funcionalidad aún no ha sido desarrollada.", () => {});
}

// Scroll
function disableScroll() {
	body.classList.add("disable-scroll");
}

function eventScroll() {
	document.addEventListener("scroll", () => {
		if (!overlay.classList.contains("show-overlay")) return;
		overlay.classList.remove("show-overlay");
	});
}

const toggleMenu = () => {
	renderMenu();
	eventLinks();
	menuResponsive.classList.toggle("show-menu");
	if (cart.classList.contains("open-cart")) {
		cart.classList.remove("open-cart");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
	cart.classList.toggle("open-cart");
	if (menuResponsive.classList.contains("show-menu")) {
		menuResponsive.classList.remove("show-menu");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const closeMenu = () => {
	if (!menuResponsive.classList.remove("show-menu")) return;
	menuResponsive.classList.remove("show-menu");
	overlay.classList.remove("show-overlay");
};

const renderMenu = () => {
	menuResponsive.innerHTML = `
    <ul class="menu-container">
        <li><a href="#home">Home</a></li>
        <li class="link-hamburger-menu">Perfil</li>
        <li class="link-hamburger-menu">Términos de Uso</li>
        <li class="link-hamburger-menu">Trabajá con Nosotros</li>
        <li class="link-hamburger-menu">Soporte</li>
	</ul>`;
};

// Events
function eventLinks() {
	const linksHamburguerMenu = document.querySelectorAll(".link-hamburger-menu");
	linksHamburguerMenu.forEach((item) => {
		item.addEventListener("click", () => {
			disableScroll();
			showAlertNotFunctionality();
		});
	});
}

const menu = () => {
	barsBtn.addEventListener("click", toggleMenu);
	overlay.addEventListener("click", closeMenu);
	window.addEventListener("scroll", closeMenu);
	cartBtn.addEventListener("click", toggleCart);
	eventScroll();
};

export default menu;
