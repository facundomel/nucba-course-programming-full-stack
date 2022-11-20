import { TYPES } from "../action-type/ActionType";

const getInitialValues = () => {
	try {
		return JSON.parse(localStorage.getItem("cartProducts")) || [];
	} catch (error) {
		return [];
	}
};

const initialState = { items: getInitialValues() };

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.ADD_PRODUCT:
      const productAddInCart = state.items.find((productInCart) => productInCart.id === action.product.id);
			if (productAddInCart) {
				return (state = {
					items: state.items.map((productInCart) => {
						if (productInCart.id === action.product.id) {
							return { ...productAddInCart, amount: productAddInCart.amount + 1 };
						} else {
							return productInCart;
						}
					}),
				});
			} else {
				return (state = { items: [...state.items, { ...action.product, amount: 1 }] });
			}
		case TYPES.REMOVE_PRODUCT:
      const productRemoveInCart = state.items.find((productInCart) => productInCart.id === action.product.id);
			if (productRemoveInCart.amount === 1) {
				return (state = { items: state.items.filter((productInCart) => productInCart.id !== action.product.id) });
			} else {
				return (state = {
					items: state.items.map((productInCart) => {
						if (productInCart.id === action.product.id) {
							return { ...productRemoveInCart, amount: productRemoveInCart.amount - 1 };
						} else {
							return productInCart;
						}
					}),
				});
			}
		default:
			return state;
	}
};
