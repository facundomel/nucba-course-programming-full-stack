import React from "react";
import { ContainerTitleAndParagraphStyled, HomeContainerStyled } from "./HomeStyles";

export const Home = () => {
	return (
		<>
			<HomeContainerStyled>
				<ContainerTitleAndParagraphStyled>
					<h1>¡Bienvenidos!</h1>

					<div>
						<p>En este sitio web encontrarán dos secciones proncipales, las cuáles son las siguientes:</p>
						<ul>
							<li>Todo List: Creá las tareas que necesites realizar o eliminalas una vez que ya las hayas realizado.</li>
							<li>Poke API: Interactuá con la API de Pokemon. Busca un Pokemon por ID y eliminalo de la interfaz cuando quieras.</li>
						</ul>
					</div>
				</ContainerTitleAndParagraphStyled>
			</HomeContainerStyled>
		</>
	);
};
