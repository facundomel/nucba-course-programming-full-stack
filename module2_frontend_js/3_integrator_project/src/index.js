import render from "./service/product/Render.js";
import hamburgerMenu from "./service/hamburger-menu/HamburgerMenu.js";
import cart from "./service/cart/Cart.js";
import filter from "./service/product/Filter.js";
import user from "./service/user/User.js";

function init() {
	render.init();
	hamburgerMenu.init();
	cart.init();
	filter.init();
	user.init();
}

init();
