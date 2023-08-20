import React from "react";
import notFoundImg from "../../../assets/page-errors/page-not-found.png";
import internalServerErrorImg from "../../../assets/page-errors/internal-server-error.png";
import { ErrorCustomContainer, LinkStyled } from "./ErrorCustomStyles";
import { HttpStatusCode } from "axios";

const ErrorCustom = ({ statusCode }) => {
	return (
		<>
			<ErrorCustomContainer>
				{statusCode === HttpStatusCode.NotFound ? (
					<>
						<img src={notFoundImg} alt="Página no encontrada" />
						<p>Parece que esta página no existe</p>
					</>
				) : (
					<>
						<img src={internalServerErrorImg} alt="Algo salió mal" width={"350px"} />
						<p>¡Ups! Algo salió mal. Si persiste comuníquese con el administrador.</p>
					</>
				)}
				<LinkStyled to={"/recetas/1"}>Ir a la página principal</LinkStyled>
			</ErrorCustomContainer>
		</>
	);
};

export default ErrorCustom;
