import React from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { TYPES } from "../../redux/action-type/ActionType";

export const ItemCart = ({ item }) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.cartItem}>
			<img src={item.img} alt={item.name} />
			<div className={styles.dataContainer}>
				<div className={styles.left}>
					<p>{item.name}</p>
					<div className={styles.buttons}>
						<button onClick={() => dispatch({ type: TYPES.ADD_PRODUCT, product: item })}>AGREGAR</button>
						<button onClick={() => dispatch({ type: TYPES.REMOVE_PRODUCT, product: item })}>QUITAR</button>
					</div>
				</div>
				<div className={styles.right}>
					<div>{item.amount}</div>
					<p>Total: ${item.amount * item.price}</p>
				</div>
			</div>
		</div>
	);
};
