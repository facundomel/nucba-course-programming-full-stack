import Data from "./data/Data.js";

const dataProduct = Data.getData();

export const render = () => {
	renderpopulars();
	renderRecommended();
	Data.getData();
};

const container = document.querySelector(".products-container-cards");
const recommended = document.querySelector(".recomendation-item");

export const renderProduct = (product) => {
	const { id, name, description, price, img, category, popular, recommended, quantity } = product;

	return `
        <div class="product-card">
            <img src="${img}" />
            <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <p class="item-description">${description}</p>
            </div>
            <div class="buy-container">
                <span class="item-price">$ ${price}</span>
                <button
                    class="btn-add"
                    data-id="${id}"
                    data-name="${name}"
                    data-description="${description}"
                    data-price="${price}"
                    data-img="${img}"
                    data-category="${category}"
                    data-popular="${popular}"
                >
                    Agregar
                </button>
			</div>
        </div>
    `;
};

export const renderProductRecommended = (product) => {
	const { id, name, description, price, img, category, popular, recommended, quantity } = product;

	return `
        <div class="recomendation-card">
            <img src="${img}" alt="Producto recomendado" />
            <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <p class="item-description">${description}</p>
                <span class="item-price">$ ${price}</span>
            </div>
            <button 
                class="btn-add" 
                data-id="${id}"
                data-name="${name}"
                data-description="${description}"
                data-price="${price}"
                data-img="${img}"
                data-category="${category}"
                data-popular="${popular}"
            >
                Agregar
            </button>
        </div>
    `;
};

export const renderProducts = (arr) => {
	container.innerHTML = arr.map(renderProduct).join("");
};

export const renderRecommendedProducts = (arr) => {
	recommended.innerHTML = arr.map(renderProductRecommended).join("");
};

export const renderpopulars = () => {
	let popularProducts = dataProduct.filter((producto) => producto.popular == true);
	renderProducts(popularProducts);
};

export const renderRecommended = () => {
	let recommendedProducts = dataProduct.filter((producto) => producto.recommended == true);
	renderRecommendedProducts(recommendedProducts);
};