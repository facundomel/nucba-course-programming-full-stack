import data from "./data/Data.js";
import utils from "../../utils/Utils.js";

const containerProductsAll = document.getElementById("container-products-all");
const containerProductsOffer = document.getElementById("container-products-offer");
const body = document.querySelector("body");

const dataProduct = data.getData();

export default new (class Render {
	#renderProductAll(product) {
		let integersAndDecimalsOfCurrentPrice = utils.getIntegersAndDecimalsOfPrices(product.price);

		return `
            <div class="product-card">
                <img src=${product.img} alt="Producto recomendado" />
                <div class="item-info">
                    <h3 class="item-title">${product.name}</h3>
                    <p class="item-description">${product.description}</p>
                </div>
                <div class="buy-container">
                    <span class="item-price">$ ${integersAndDecimalsOfCurrentPrice[0]} <sup>${integersAndDecimalsOfCurrentPrice[1]}</sup></span>
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
		let integersAndDecimalsOfOldPrice = utils.getIntegersAndDecimalsOfPrices(product.oldPrice);
		let integersAndDecimalsOfCurrentPrice = utils.getIntegersAndDecimalsOfPrices(product.price);

		return `
            <div class="product-offer">
                <img src=${product.img} alt="Oferta" />
                <div class="item-info-offer">
                    <h3 class="item-title">${product.name}</h3>
                    <div class="prices-offer">
                        <span class="item-price-old"><div class="integer-price-old">$ ${integersAndDecimalsOfOldPrice[0]}</div> <sup class=decimal-price-old>${integersAndDecimalsOfOldPrice[1]}</sup></span>
                        <span class="item-price">$ ${integersAndDecimalsOfCurrentPrice[0]} <sup>${integersAndDecimalsOfCurrentPrice[1]}</sup></span>
                    </div>
                </div>
                <div>
                    <i 
                        title="Agregar"
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
                    
                    <i title="Información" class="fa-solid fa-circle-info btn-view-more" data-description="${product.description}"></i>
                </div>
            </div>
        `;
	}

	renderProductsAll() {
		let productsAll = dataProduct.filter((product) => !product.offer);
		containerProductsAll.innerHTML = productsAll.map(this.#renderProductAll).join("");
	}

	#renderProductsOffer() {
		let productsOffer = dataProduct.filter((product) => product.offer);
		containerProductsOffer.innerHTML = productsOffer.map(this.#renderProductOffer).join("");
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
	}

	#clickViewMoreInOffer(e) {
		if (!e.target.classList.contains("btn-view-more")) return;

		this.#disableScroll();
		utils.showAlertButtonRight(e.target.dataset.description, "");
	}

	// Events
	#eventClickViewMoreInOffer() {
		containerProductsOffer.addEventListener("click", (e) => {
			e.preventDefault();
			this.#clickViewMoreInOffer(e);
		});
	}

	init() {
		this.renderProductsAll();
		this.#renderProductsOffer();
		this.#eventClickViewMoreInOffer();
	}
})();
