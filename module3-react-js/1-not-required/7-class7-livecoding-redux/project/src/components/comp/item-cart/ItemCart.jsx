import React from "react";
import { useDispatch } from "react-redux";
import { actionAddProduct, actionRemoveProduct } from "../../redux/actions/Actions";
import { CartItemStyled, DataContainerStyled, DataContainerLeftStyled, DataContainerRightStyled } from "./ItemCartStyles";

export const ItemCart = ({ item }) => {
	const dispatch = useDispatch();

	return (
		<CartItemStyled>
			<img src={item.img} alt={item.name} />
			<DataContainerStyled>
				<DataContainerLeftStyled>
					<p>{item.name}</p>
					<div>
						<button onClick={() => dispatch(actionAddProduct(item))}>AGREGAR</button>
						<button onClick={() => dispatch(actionRemoveProduct(item))}>QUITAR</button>
					</div>
				</DataContainerLeftStyled>
				<DataContainerRightStyled>
					<div>{item.amount}</div>
					<p>Total: ${item.amount * item.price}</p>
				</DataContainerRightStyled>
			</DataContainerStyled>
		</CartItemStyled>
	);
};
