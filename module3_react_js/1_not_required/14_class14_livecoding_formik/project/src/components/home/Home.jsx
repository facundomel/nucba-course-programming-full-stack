import React from "react";
import { ContainerTitleAndParagraphStyled, HomeContainerStyled } from "./HomeStyles";

export const Home = () => {
	return (
		<>
			<HomeContainerStyled>
				<ContainerTitleAndParagraphStyled>
					<h1>¡Bienvenidos!</h1>

					<div>
						<p>
							En este sitio web encontrará una sección con un formulario para realizar una solicitud de empleo para ser delivery de una
							pizzería. Dicho formulario será realizado con Formik, y las validaciones se realizarán con Yup.
						</p>
					</div>
				</ContainerTitleAndParagraphStyled>
			</HomeContainerStyled>
		</>
	);
};
