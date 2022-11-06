import render from "./service/product/Render.js";
import hamburgerMenu from "./service/hamburger-menu/HamburgerMenu.js";
import cart from "./service/cart/Cart.js";
import filter from "./service/product/Filter.js";
import userProfile from "./service/user-profile/UserProfile.js";

function init() {
	render.init();
	hamburgerMenu.init();
	cart.init();
	filter.init();
	userProfile.init();
}

init();
