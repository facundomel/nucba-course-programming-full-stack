import React, { useEffect } from "react";
import Cart from "../Cart";
import Products from "../Products";
import styles from './styles.module.css'
import { useSelector } from 'react-redux'

export const Home = () => {
  const items = useSelector(state => state.cart)

	useEffect(() => {
		localStorage.setItem("cartProducts", JSON.stringify(items.items));
	}, [items.items]);

  return (
    <div className={styles.home}>
      <Cart />
      <Products />
    </div>
  );
};