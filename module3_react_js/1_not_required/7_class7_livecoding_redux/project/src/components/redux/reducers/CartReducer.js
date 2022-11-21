import { TYPES } from "../actions/Actions";

const getInitialValues = () => {
	try {
		return JSON.parse(localStorage.getItem("cartProducts")) || [];
	} catch (error) {
		return [];
	}
};

const initialState = { itemsCart: getInitialValues(), openCart: false, productsLengthCart: 0 };

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.ADD_PRODUCT:
			const productAddInCart = state.itemsCart.find((productInCart) => productInCart.id === action.product.id);
			if (productAddInCart) {
				return (state = {
					itemsCart: state.itemsCart.map((productInCart) => {
						if (productInCart.id === action.product.id) {
							return { ...productAddInCart, amount: productAddInCart.amount + 1 };
						} else {
							return productInCart;
						}
					}),
					openCart: state.openCart ? true : false,
				});
			} else {
				return (state = { itemsCart: [...state.itemsCart, { ...action.product, amount: 1 }], openCart: state.openCart ? true : false });
			}

		case TYPES.REMOVE_PRODUCT:
			const productRemoveInCart = state.itemsCart.find((productInCart) => productInCart.id === action.product.id);
			if (productRemoveInCart.amount === 1) {
				return (state = {
					itemsCart: state.itemsCart.filter((productInCart) => productInCart.id !== action.product.id),
					openCart: state.openCart ? true : false,
				});
			} else {
				return (state = {
					itemsCart: state.itemsCart.map((productInCart) => {
						if (productInCart.id === action.product.id) {
							return { ...productRemoveInCart, amount: productRemoveInCart.amount - 1 };
						} else {
							return productInCart;
						}
					}),
					openCart: state.openCart ? true : false,
				});
			}

		case TYPES.OPEN_CART:
			return { ...state, openCart: !state.openCart };

		case TYPES.PRODUCTS_LENGTH:
			return { ...state, productsLengthCart: state.itemsCart.reduce((previous, current) => previous + current.amount, 0) };

		default:
			return state;
	}
};
