// Imports
import localStorage from "../../repository/LocalStorage.js";
import Product from "../../model/Product.js";
import utils from "../../utils/Utils.js";

// Elements DOM
const cartContainer = document.getElementById("cart-container");
const productsContainerOffer = document.querySelector(".container-products-offer");
const productsContainerAll = document.querySelector(".container-products-all");
const subtotal = document.getElementById("subtotal");
const shippingPrice = document.getElementById("shipping-price");
const total = document.getElementById("total");
const btnBuyCart = document.getElementById("btn-buy-cart");
const btnClearCart = document.getElementById("btn-clear-cart");
const cart = document.getElementById("cart");
const btnCloseCart = document.getElementById("btn-close-cart");
const overlay = document.getElementById("overlay");
const body = document.querySelector("body");
const quantityProductsCart = document.getElementById("quantity-products-cart");

// Class
export default new (class Cart {
	#product = new Product();
	#keyLocalStorage = "cartPruducts";
	#cartProducts = localStorage.get(this.#keyLocalStorage) || [];

	// Add product
	#addProductToCart(e) {
		if (!e.target.classList.contains("btn-add")) return;

		if (
			this.#cartProducts.some((prod) => {
				return prod.id == this.#product.id;
			})
		) {
			utils.showSnackbar(`El producto "${this.#product.name}" ya se encuentra en el carrito`, "background-color: var(--red-light)");
			return;
		}

		this.#renderIncrementProductCart();
		utils.showSnackbar(`Producto "${this.#product.name}" agregado al carrito`, "background-color: var(--green-light)");
		this.#cartProducts = [...this.#cartProducts, this.#product];
		localStorage.save(this.#keyLocalStorage, this.#cartProducts);
		this.#renderAllAndDisableButtons();
	}

	// Render products
	#renderProductInCart(product) {
		let integersAndDecimalsOfOldPrice = product.offer == "true" ? utils.getIntegersAndDecimalsOfPrices(product.oldPrice) : "";
		let integersAndDecimalsOfCurrentPrice = utils.getIntegersAndDecimalsOfPrices(product.price);

		return `
      <div class="cart-item">
        <div class=img-and-item-info-cart>
          <img src=${product.img} alt="Producto" title="Producto del carrito"/>
          <div class="item-info">
            <h5 class="item-title">${product.name}</h5>
            <div class=prices-product-cart>
              <span class="item-price-old">${
								product.offer == "true"
									? `<div class="integer-price-old">$ ${integersAndDecimalsOfOldPrice[0]}</div> <sup class=decimal-price-old>${integersAndDecimalsOfOldPrice[1]}</sup>`
									: ""
							}</span>
              <span class="item-price">$ ${integersAndDecimalsOfCurrentPrice[0]} <sup>${integersAndDecimalsOfCurrentPrice[1]}</sup></span>
            </div>
          </div>
        </div>
        <div class="item-handler">
          <div class="down-and-up-cart">
            <span class="quantity-handler down" data-id="${product.id}">-</span>
            <span class="item-quantity">${product.quantity}</span>
            <span class="quantity-handler up" data-id="${product.id}">+</span>
          </div>
          <i class="fa-solid fa-trash-can btn-delete-product-cart" title="Eliminar" data-id="${product.id}"></i>
        </div>
      </div>
    `;
	}

	#renderAllProductsInCart() {
		cartContainer.innerHTML = this.#cartProducts.map((product) => this.#renderProductInCart(product)).join("");
	}

	// Increment and decrement quantity product
	#incrementAndDecrementQuantityProduct(e) {
		if (!e.target.classList.contains("down") && !e.target.classList.contains("up")) return;

		const product = this.#cartProducts.find((item) => item.id === e.target.dataset.id);

		if (e.target.classList.contains("down")) {
			if (product.quantity === 1) {
				this.#deleteProduct(product);
				return;
			}
			this.#cartProducts = this.#cartProducts.map((item) => {
				return item.id === product.id ? { ...item, quantity: Number(item.quantity) - 1 } : item;
			});
		} else if (e.target.classList.contains("up")) {
			this.#cartProducts = this.#cartProducts.map((item) => {
				return item.id === product.id ? { ...item, quantity: Number(item.quantity) + 1 } : item;
			});
		}

		localStorage.save(this.#keyLocalStorage, this.#cartProducts);
		this.#renderAllAndDisableButtons();
	}

	// Quantity products in cart
	#renderIncrementProductCart() {
		if (!quantityProductsCart.classList.contains("show-quantity-products-cart"))
			quantityProductsCart.classList.add("show-quantity-products-cart");

		quantityProductsCart.innerText = Number(quantityProductsCart.innerText) + 1;
	}

	#renderDecrementProductCart() {
		if (!quantityProductsCart.classList.contains("show-quantity-products-cart")) return;

		if (this.#cartProducts.length == 1) {
			quantityProductsCart.classList.remove("show-quantity-products-cart");
			return;
		}
		quantityProductsCart.innerText = Number(quantityProductsCart.innerText) - 1;
	}

	#renderDefaultQuantityCart() {
		if (this.#cartProducts == 0) {
			quantityProductsCart.classList.remove("show-quantity-products-cart");
			return;
		}

		quantityProductsCart.classList.add("show-quantity-products-cart");
		quantityProductsCart.innerText = this.#cartProducts.length;
	}

	// Delete product
	#deleteProduct(product) {
		this.#disableScroll();

		utils.showModalConfirm(
			`¿Desea eliminar el producto "${product.name}" del carrito?`,
			() => {
				this.#renderDecrementProductCart();
				this.#cartProducts = this.#cartProducts.filter((prod) => prod.id !== product.id);
				localStorage.save(this.#keyLocalStorage, this.#cartProducts);
				this.#renderAllAndDisableButtons();
			},
			""
		);
	}

	#btnDelete(e) {
		if (!e.target.classList.contains("btn-delete-product-cart")) return;
		const product = this.#cartProducts.find((item) => item.id === e.target.dataset.id);
		this.#deleteProduct(product);
	}

	// Show prices
	#getPricesProducts() {
		let shippingPrice = 0;

		const subTotal = this.#cartProducts.reduce((acc, cur) => {
			return acc + Number(this.#getNumberWithoutDot(cur.price)) * Number(cur.quantity);
		}, 0);

		const total = this.#cartProducts.reduce((acc, cur) => {
			return acc + Number(this.#getNumberWithoutDot(cur.price)) * Number(cur.quantity);
		}, 0);

		if (subTotal > 0 && subTotal < 6500) shippingPrice = 1200;

		return { subTotal, shippingPrice, total: total + shippingPrice };
	}

	#renderPrices() {
		// const prices = this.#getPricesProducts();

		// subtotal.innerHTML = `$ ${this.#getNumberWithSemicolon(prices.subTotal.toFixed(2))}`;
		// shippingPrice.innerHTML = `${prices.shippingPrice > 0 ? "$ " + this.#getNumberWithSemicolon(prices.shippingPrice.toFixed(2)) : "Gratis"}`;
		// total.innerHTML = `$ ${this.#getNumberWithSemicolon(prices.total.toFixed(2))}`;

		const prices = this.#getPricesProducts();
		let integersAndDecimalsOfSubtotalPrice = utils.getIntegersAndDecimalsOfPrices(this.#getNumberWithSemicolon(prices.subTotal.toFixed(2)));
		let integersAndDecimalsOfShippingPrice = utils.getIntegersAndDecimalsOfPrices(
			this.#getNumberWithSemicolon(prices.shippingPrice.toFixed(2))
		);
		let integersAndDecimalsOfTotalPrice = utils.getIntegersAndDecimalsOfPrices(this.#getNumberWithSemicolon(prices.total.toFixed(2)));

		subtotal.innerHTML = `$ ${integersAndDecimalsOfSubtotalPrice[0]} <sup>${integersAndDecimalsOfSubtotalPrice[1]}</sup>`;
		shippingPrice.innerHTML = `${
			prices.shippingPrice > 0
				? "$ " + integersAndDecimalsOfShippingPrice[0]`<sup>${integersAndDecimalsOfSubtotalPrice[1]}</sup>`
				: "Gratis"
		}`;
		total.innerHTML = `$ ${integersAndDecimalsOfTotalPrice[0]} <sup>${integersAndDecimalsOfTotalPrice[1]}</sup>`;
	}

	#getNumberWithoutDot(number) {
		return number.replace(/\./g, "").replace(/\,/g, ".");
	}

	#getNumberWithSemicolon(number) {
		let splitNum = number.split(".");
		let nums = [];
		let countForDot = 0;
		let countElements = 0;

		for (let index = splitNum[0].length - 1; index >= 0; index--) {
			countForDot++;
			countElements++;
			nums.push(splitNum[0][index]);
			if (countForDot == 3 && countElements < splitNum[0].length) {
				nums.push(".");
				countForDot = 0;
			}
		}

		return nums.reverse().join("").concat(",").concat(splitNum[1]);
	}

	// Button buy and clear cart
	#disableBuyBtn(btn) {
		if (this.#cartProducts.length == 0) {
			btn.classList.add("disable-buttons-cart");
			return;
		}

		btn.classList.remove("disable-buttons-cart");
	}

	#clearCartAndLocalStorage() {
		this.#cartProducts = [];
		localStorage.remove(this.#keyLocalStorage);
		this.#renderAllAndDisableButtons();
	}

	#buttonBuyProducts() {
		if (btnBuyCart.classList.contains("disable-buttons-cart")) return;

		this.#disableScroll();

		utils.showModalConfirm(
			"¿Desea confirmar la compra?",
			() => {
				this.#clearCartAndLocalStorage();
				this.#closeCartAndOverlay();
			},
			""
		);
	}

	#buttonClearCart() {
		if (btnClearCart.classList.contains("disable-buttons-cart")) return;

		this.#disableScroll();

		utils.showModalConfirm(
			"¿Desea vaciar el carrito?",
			() => {
				this.#clearCartAndLocalStorage();
				this.#closeCartAndOverlay();
			},
			""
		);
	}

	// Show and close cart
	#closeCartOnScroll() {
		if (!cart.classList.contains("open-cart")) return;

		this.#closeCartAndOverlay();
	}

	#closeCartAndOverlay() {
		cart.classList.remove("open-cart");
		overlay.classList.remove("show-overlay");
	}

	// Scroll
	#disableScroll() {
		body.classList.add("disable-scroll");
	}

	// Render all and disable buttons
	#renderAllAndDisableButtons() {
		this.#renderAllProductsInCart();
		this.#renderPrices();
		this.#renderDefaultQuantityCart();
		this.#disableBuyBtn(btnBuyCart);
		this.#disableBuyBtn(btnClearCart);
	}

	// Events
	#eventLoadPage() {
		window.addEventListener("load", () => {
			this.#renderAllAndDisableButtons();
		});
	}

	#eventAddProductAll() {
		productsContainerAll.addEventListener("click", (e) => {
			e.preventDefault();
			this.#product = Product.createProductForCart(e.target.dataset);
			this.#addProductToCart(e);
		});
	}

	#eventAddProductOffer() {
		productsContainerOffer.addEventListener("click", (e) => {
			e.preventDefault();
			this.#product = Product.createProductForCart(e.target.dataset);
			this.#addProductToCart(e);
		});
	}

	#eventCartContainer() {
		cartContainer.addEventListener("click", (e) => {
			e.preventDefault();
			this.#incrementAndDecrementQuantityProduct(e);
			this.#btnDelete(e);
		});
	}

	#eventBuyProducts() {
		btnBuyCart.addEventListener("click", (e) => {
			e.preventDefault();
			this.#buttonBuyProducts();
		});
	}

	#eventClearCart() {
		btnClearCart.addEventListener("click", (e) => {
			e.preventDefault();
			this.#buttonClearCart();
		});
	}

	#eventCloseCart() {
		btnCloseCart.addEventListener("click", () => {
			cart.classList.remove("open-cart");
			overlay.classList.remove("show-overlay");
		});
	}

	#eventCloseCartOnScroll() {
		window.addEventListener("scroll", () => {
			this.#closeCartOnScroll();
		});
	}

	#eventCloseCartOnOverlayClick() {
		overlay.addEventListener("click", () => {
			this.#closeCartAndOverlay();
		});
	}

	// Init
	init() {
		this.#eventLoadPage();
		this.#eventAddProductAll();
		this.#eventAddProductOffer();
		this.#eventCartContainer();
		this.#eventBuyProducts();
		this.#eventClearCart();
		this.#eventCloseCart();
		this.#eventCloseCartOnScroll();
		this.#eventCloseCartOnOverlayClick();
		this.#renderDefaultQuantityCart();
	}
})();
