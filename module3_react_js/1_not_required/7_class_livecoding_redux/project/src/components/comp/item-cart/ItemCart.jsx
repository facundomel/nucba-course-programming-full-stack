import React from "react";
import { useDispatch } from "react-redux";
import { TYPES } from "../../redux/action-type/ActionType";
import { CartitemStyled as CartItemStyled, DataContainerStyled, DataContainerLeftStyled, DataContainerRightStyled } from "./ItemCartStyles";

export const ItemCart = ({ item }) => {
	const dispatch = useDispatch();

	return (
		<CartItemStyled>
			<img src={item.img} alt={item.name} />
			<DataContainerStyled>
				<DataContainerLeftStyled>
					<p>{item.name}</p>
					<div>
						<button onClick={() => dispatch({ type: TYPES.ADD_PRODUCT, product: item })}>AGREGAR</button>
						<button onClick={() => dispatch({ type: TYPES.REMOVE_PRODUCT, product: item })}>QUITAR</button>
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
