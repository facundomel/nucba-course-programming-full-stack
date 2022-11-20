export const TYPES = {
	ADD_PRODUCT: "ADD_PRODUCT",
	REMOVE_PRODUCT: "REMOVE_PRODUCT",
	OPEN_CART: "OPEN_CART",
	PRODUCTS_LENGTH: "PRODUCTS_LENGTH",
};

export const actionAddProduct = (product) => {
	return { type: TYPES.ADD_PRODUCT, product: product };
};

export const actionRemoveProduct = (product) => {
	return { type: TYPES.REMOVE_PRODUCT, product: product };
};

export const actionProductsLengthCart = () => {
	return { type: TYPES.PRODUCTS_LENGTH };
};

export const actionOpenCart = () => {
	return { type: TYPES.OPEN_CART };
};
