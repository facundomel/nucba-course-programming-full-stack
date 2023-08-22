import data from "./data/Data.js";
import render from "./Render.js";

/* El div con todos los botones */
const filtersProducts = document.getElementById("filters-products");
/* Todos los botones  */
const categoriesList = document.querySelectorAll(".category");
/* Container para renderizar las card de los productos */
const containerProductsAll = document.getElementById("container-products-all");

/* Todos los productos */
const dataProduct = data.getData();

export default new (class Filter {
	/* Funcion para aplicar los filtros */
	#applyFilter(e) {
		/* Si no contiene category como clase no agarra el elemento porque da undefined cuando se filtra ya que no tiene dataset y tambien al aplicar la clase active si no se limita de esta manera que contenga category se podria aplicar la clase a las fotos y titulos de los botones */
		if (!e.target.classList.contains("category")) return;
		this.#buttonActiveState(e);
		/* Renderizo los productos con esa categoria */
		this.#renderFilteredProducts(e.target.dataset.category);
	}

	/* Funcion para renderizar los productos */
	#renderFilteredProducts(selectedCategory) {
		/* Filtro los productos por la categoria seleccionada */
		const filteredProducts = dataProduct.filter((product) => selectedCategory != "all" ? product.category === selectedCategory : dataProduct);
		/* Si el array tiene 0 productos, no hay stock, se renderiza un mensaje */
		if (filteredProducts.length === 0)
			return this.#renderError(containerProductsAll, "No hay stock de este producto. Por favor, seleccione otra categoría.");
		/*Sino se renderiza el array de los productos filtrados  */
		render.renderProductsAll(filteredProducts);
	}

	#buttonActiveState(e) {
		/* transformo la lista en un array para poder mapearla */
		const btnList = [...categoriesList];
		/* agarro al boton seleccionado */
		const selectedBtn = e.target;
		/* Si el boton seleccionado no contiene la clase active, mapeo sobre todos los botones le quito a todos los botones la clase active */
		if (!selectedBtn.classList.contains("active")) {
			btnList.map((btn) => {
				btn.classList.remove("active");
			});
			/* aplico al boton seleccionado la clase active */
			selectedBtn.classList.add("active");
		}
	}

	/* Funcion para renderizar un mensaje en un contenedor  */
	#renderError(container, message) {
		container.innerHTML = `
      <div>
        <h4> ${message} </h4>
      </div>
    `;
	}

	// Events
	#eventClickFilter() {
		filtersProducts.addEventListener("click", (e) => {
			this.#applyFilter(e);
		});
	}

	init() {
		this.#renderFilteredProducts("all");
		this.#eventClickFilter();
	}
})();
