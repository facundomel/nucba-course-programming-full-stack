import { Pagination, PaginationItem } from "@mui/material";
import styled from "styled-components";

export const PaginationCustomStyled = styled(Pagination)`
	margin-top: 30px;

	.MuiPaginationItem-root {
		background-color: var(--blue-light); // Cambia aquí el color de fondo deseado para los botones
		color: var(--blue-dark); // Cambia aquí el color del texto deseado para los botones
		border-radius: 4px; // Cambia aquí el radio de borde deseado para los botones
	}

	/* .Mui-selected {
    background-color: red; // Cambia aquí el color de fondo cuando el botón esté seleccionado
  } */
`;
