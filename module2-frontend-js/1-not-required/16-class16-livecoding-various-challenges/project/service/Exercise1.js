const barsMenu = document.querySelector(".navbar-list");
const barsIcon = document.querySelector(".menu-icon");

export default new (class Exercise1 {
	hamburguerMenu() {
		barsIcon.addEventListener("click", () => {
			if (!barsMenu.classList.contains("open-menu")) {
				barsMenu.classList.add("open-menu");
				barsIcon.classList.remove("rotate-icon-horizontally");
				barsIcon.classList.add("rotate-icon-vertically");
			} else {
				barsMenu.classList.remove("open-menu");
				barsIcon.classList.remove("rotate-icon-vertically");
				barsIcon.classList.add("rotate-icon-horizontally");
			}
		});
	}
})();
