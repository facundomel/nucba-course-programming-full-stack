import data from "./data/Data.js";

const containerProductsAll = document.getElementById("container-products-all");
const containerProductsOffer = document.getElementById("container-products-offer");

const dataProduct = data.getData();

export default new (class Render {
	#renderProduct(product) {
		return `
            <div class="product-card">
                <img src=${product.img} alt="Producto recomendado" />
                <div class="item-info">
                    <h3 class="item-title">${product.name}</h3>
                    <p class="item-description">${product.description}</p>
                </div>
                <div class="buy-container">
                    <span class="item-price">$ ${product.price}</span>
                    <button
                        class="btn-add"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-description="${product.description}"
                        data-price="${product.price}"
                        data-img="${product.img}"
                        data-category="${product.category}"
                        data-offer="${product.offer}"
                    >
                    Agregar
                    </button>
                </div>
            </div>
        `;
	}

	#renderProductOffer(product) {
		return `
            <div class="product-offer">
                <img src=${product.img} alt="Oferta" />
                <div class="item-info-offer">
                    <h3 class="item-title">${product.name}</h3>
                    <div class="prices-offer">
                        <span class="item-price-old">$ ${product.oldPrice}</span>
                        <span class="item-price">$ ${product.price}</span>
                    </div>
                </div>
                <div>
                    <i 
                        class="fa-solid fa-cart-plus btn-add" 
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-description="${product.description}"
                        data-oldprice="${product.oldPrice}"
                        data-price="${product.price}"
                        data-img="${product.img}"
                        data-category="${product.category}"
                        data-offer="${product.offer}">
                    </i>
                    <i class="fa-solid fa-eye"></i>
                </div>
            </div>
        `;
	}

	#renderProductsAll() {
		let productsAll = dataProduct.filter((product) => !product.offer);
		containerProductsAll.innerHTML = productsAll.map(this.#renderProduct).join("");
	}

	#renderProductsOffer() {
		let productsOffer = dataProduct.filter((product) => product.offer);
		containerProductsOffer.innerHTML = productsOffer.map(this.#renderProductOffer).join("");
	}

	init() {
		this.#renderProductsAll();
		this.#renderProductsOffer();
	}
})();
