import React from "react";
import { MenuStyled } from "../styles/MenuStyles";

export const Menu = ({ open }) => {
	return (
		<>
			<MenuStyled open={open}>
				<a href="#">
					<span>💁🏻‍♂️Sobre nosotros</span>
				</a>
				<a href="#">
					<span>💸Precios</span>
				</a>
				<a href="#">
					<span>📩Contacto</span>
				</a>
			</MenuStyled>
		</>
	);
};
