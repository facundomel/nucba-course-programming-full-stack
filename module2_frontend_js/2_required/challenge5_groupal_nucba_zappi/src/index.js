import cart from "./cart/Cart.js";
import { render } from "./render/Render.js";
import filter from "./filter/Filter.js";
import menu from "./menu/Menu.js";
import other from "./other/Other.js";

function init() {
	cart.init();
	render();
	filter();
	menu();
	other.init();
}

init();
