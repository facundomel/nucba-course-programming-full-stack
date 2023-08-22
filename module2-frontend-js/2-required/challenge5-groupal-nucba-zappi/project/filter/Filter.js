import Data from "../render/data/Data.js";
import { render, renderProducts } from "../render/Render.js";
/* el div con todos los botones */
const categories = document.querySelector(".categories");
/* Todos los botones  */
const categoriesList = document.querySelectorAll(".category");
/* Container para renderizar */
const productsContainerCards = document.querySelector(".products-container-cards");
/* Todos los productos */
const dataProduct = Data.getData();

/* Funcion para aplicar los filtros */
const applyFilter = (e) => {
	/* Si no contiene category como clase no agarra el elemento porque da undefined cuando se filtra ya que no tiene dataset y tambien al aplicar la clase active si no se limita de esta manera que contenga category se podria aplicar la clase a las fotos y titulos de los botones */
	if (!e.target.classList.contains("category")) return;
	/* Agarro la categoria seleccionada */
	let selectedCategory = e.target.dataset.category;
	buttonActiveState(e);
	/* Si no tiene categoria mostrar los mas populares */
	if (!selectedCategory) {
		render();
		/* el return es para que corte la funcion aca y no siga, si sigue se renderiza el error que no hay stock */
		return;
	}
	/* Renderizo los productos con esa categoria */
	renderFilteredProducts(selectedCategory);
};

/* Funcion para renderizar los productos */
const renderFilteredProducts = (selectedCategory) => {
	/* Filtro los productos por la categoria seleccionada */
	const filteredProducts = dataProduct.filter((product) => product.category === selectedCategory);
	/* Si el array tiene 0 productos, no hay stock, se renderiza un mensaje */
	if (filteredProducts.length === 0) {
		return renderError(productsContainerCards, "No hay stock de este producto. Por favor, seleccione otra categoría.");
	}
	/*Sino se renderiza el array de los productos filtrados  */
	renderProducts(filteredProducts);
};

const buttonActiveState = (e) => {
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
};

/* Funcion para renderizar un mensaje en un contenedor  */
const renderError = (container, message) => {
	container.innerHTML = `<div><h3>${message}</h3></div>`;
	return;
};

const filter = () => {
	categories.addEventListener("click", applyFilter);
};

export default filter;
