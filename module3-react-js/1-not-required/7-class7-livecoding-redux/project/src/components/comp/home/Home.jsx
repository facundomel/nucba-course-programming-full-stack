import React, { useEffect } from "react";
import Cart from "../cart/Cart";
import Products from "../products/Product";
import { useSelector } from "react-redux";
import { HomeStyled } from "./HomeStyles";

export const Home = () => {
	const items = useSelector((state) => state.cart.itemsCart);

	useEffect(() => {
		localStorage.setItem("cartProducts", JSON.stringify(items));
	}, [items]);

	return (
		<HomeStyled>
			<Cart />
			<Products />
		</HomeStyled>
	);
};
