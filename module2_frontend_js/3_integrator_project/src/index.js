import render from "./service/product/Render.js";
import hamburgerMenu from "./service/hamburger-menu/HamburgerMenu.js";
import cart from "./service/cart/Cart.js";

function init() {
	render.init();
	hamburgerMenu.init();
	cart.init();
}

init();
