import { Pagination, PaginationItem } from "@mui/material";
import styled from "styled-components";

// export const PaginationCustomStyled = styled(Pagination)`
// 	margin-top: 30px;

// 	/* .MuiPaginationItem-root {
// 		background-color: var(--white); // Cambia aquí el color de fondo deseado para los botones
// 		color: var(--blue-dark); // Cambia aquí el color del texto deseado para los botones
// 		border-radius: 4px; // Cambia aquí el radio de borde deseado para los botones
// 	} */

// 	/* .Mui-selected {
//     background-color: red; // Cambia aquí el color de fondo cuando el botón esté seleccionado
//   } */

// 	.MuiPaginationItem-root.Mui-disabled {
//     /* pointer-events: auto; */
//     opacity: 1;
//     background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados
// 		color: var(--blue-dark);
//   }

//   .MuiPaginationItem-root.Mui-disabled:hover {
//     background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados al pasar el cursor
// 		color: var(--blue-dark);
//   }

//   .MuiPaginationItem-root.Mui-selected {
//     background-color: var(--blue-light); // Cambia aquí el color de fondo deseado para el botón seleccionado
// 		color: var(--blue-dark);
//   }

//   .MuiPaginationItem-root {
//     background-color: var(--white); // Cambia aquí el color de fondo deseado para los botones
// 		color: var(--blue-dark); // Cambia aquí el color del texto deseado para los botones
// 		border-radius: 4px; // Cambia aquí el radio de borde deseado para los botones
//   }

// 	.MuiPaginationItem-root.Mui-selected:focus {
//     background-color: var(--blue-light); // Cambia aquí el color de fondo deseado para el botón seleccionado al tener el foco
//   }

// 	.MuiPaginationItem-icon[data-mui-type="previous"], .MuiPaginationItem-icon[data-mui-type="next"] {
//     color: var(--blue-dark); // Cambia aquí el color del ícono de "Anterior" y "Siguiente"
//   }

//   .MuiPaginationItem-icon[data-mui-type="previous"]:hover, .MuiPaginationItem-icon[data-mui-type="next"]:hover {
//     color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al pasar el cursor
//   }

//   .MuiPaginationItem-icon[data-mui-type="previous"]:focus, .MuiPaginationItem-icon[data-mui-type="next"]:focus {
//     color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al tener el foco
//   }
// `;

// export const PaginationCustomStyled = styled(Pagination)`
// 	margin-top: 30px;

// 	.MuiPaginationItem-root {
// 		background-color: var(--white); // Cambia aquí el color de fondo deseado para los botones
// 		color: var(--blue-dark); // Cambia aquí el color del texto deseado para los botones
// 		border-radius: 4px; // Cambia aquí el radio de borde deseado para los botones
// 	}

// 	.MuiPaginationItem-root.Mui-disabled {
// 		/* pointer-events: auto; */
// 		opacity: 1;
// 		background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados
// 		color: var(--blue-dark);
// 	}

// 	.MuiPaginationItem-root.Mui-disabled:hover {
// 		background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados al pasar el cursor
// 		color: var(--blue-dark);
// 	}

// 	.MuiPaginationItem-root.Mui-selected {
// 		background-color: var(--blue-light); // Cambia aquí el color de fondo deseado para el botón seleccionado
// 		color: var(--blue-dark);
// 	}

// 	.MuiPaginationItem-root.Mui-selected:focus {
// 		background-color: var(--blue-light); // Cambia aquí el color de fondo deseado para el botón seleccionado al tener el foco
// 	}

// 	.MuiPaginationItem-root.Mui-selected:hover {
// 		background-color: var(--blue-light); // Cambia aquí el color de fondo deseado para el botón seleccionado al pasar el cursor
// 	}

// 	.MuiPaginationItem-icon[data-mui-type="previous"],
// 	.MuiPaginationItem-icon[data-mui-type="next"] {
// 		color: var(--blue-dark); // Cambia aquí el color del ícono de "Anterior" y "Siguiente"
// 	}

// 	.MuiPaginationItem-icon[data-mui-type="previous"]:hover,
// 	.MuiPaginationItem-icon[data-mui-type="next"]:hover {
// 		color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al pasar el cursor
// 	}

// 	.MuiPaginationItem-icon[data-mui-type="previous"]:focus,
// 	.MuiPaginationItem-icon[data-mui-type="next"]:focus {
// 		color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al tener el foco
// 	}
// `;

// Este es el que vale
export const PaginationCustomStyled = styled(Pagination)`
	margin-top: 30px;

	.MuiPaginationItem-root {
		background-color: var(--white); // Cambia aquí el color de fondo deseado para los botones
		color: var(--blue-dark); // Cambia aquí el color del texto deseado para los botones
		border-radius: 4px; // Cambia aquí el radio de borde deseado para los botones
		margin: 0 10px; /* Ajusta aquí el espacio horizontal entre los botones */
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: var(--orange2); // Cambia aquí el color de fondo deseado al pasar el cursor sobre el botón
			color: var(--blue-dark);
		}

		&.Mui-selected {
			background-color: var(--white); // Mantenemos el color blanco cuando el botón está seleccionado
		}

		&.Mui-selected:focus {
			background-color: var(--white); // Mantenemos el color blanco cuando el botón seleccionado es el botón activo (al hacer clic)
		}

		&.Mui-selected:hover {
			background-color: var(--white); // Mantenemos el color blanco cuando el botón seleccionado al pasar el cursor
		}

		&.Mui-disabled {
			/* pointer-events: auto; */
			opacity: 1;
			background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados
			color: var(--blue-dark);

			&:hover {
				background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados al pasar el cursor
				color: var(--blue-dark);
			}
		}
	}

	.MuiPaginationItem-root.Mui-disabled {
		/* pointer-events: auto; */
		opacity: 1;
		background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados
		color: var(--blue-dark);
	}

	.MuiPaginationItem-root.Mui-disabled:hover {
		background-color: var(--gray); // Cambia aquí el color de fondo deseado para los botones deshabilitados al pasar el cursor
		color: var(--blue-dark);
	}

	.MuiPaginationItem-root.Mui-selected {
		background-color: var(--orange3); // Cambia aquí el color de fondo deseado para el botón seleccionado
		color: var(--blue-dark);
	}

	.MuiPaginationItem-root.Mui-selected:focus {
		background-color: var(--blue-light); // Cambia aquí el color de fondo deseado para el botón seleccionado al tener el foco
	}

	.MuiPaginationItem-root.Mui-selected:hover {
		background-color: var(--orange3); // Cambia aquí el color de fondo deseado para el botón seleccionado al pasar el cursor
	}

	.MuiPaginationItem-icon[data-mui-type="previous"],
	.MuiPaginationItem-icon[data-mui-type="next"] {
		color: var(--blue-dark); // Cambia aquí el color del ícono de "Anterior" y "Siguiente"

		&:hover {
			color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al pasar el cursor
		}

		&:focus {
			color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al tener el foco
		}
	}

	.MuiPaginationItem-icon[data-mui-type="previous"]:hover,
	.MuiPaginationItem-icon[data-mui-type="next"]:hover {
		color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al pasar el cursor
	}

	.MuiPaginationItem-icon[data-mui-type="previous"]:focus,
	.MuiPaginationItem-icon[data-mui-type="next"]:focus {
		color: var(--blue-light); // Cambia aquí el color del ícono de "Anterior" y "Siguiente" al tener el foco
	}

	/* Media query para pantallas de 400px o menos */
	@media (max-width: 400px) {
		.MuiPagination-ul {
			width: 200px;
			justify-content: space-between; /* Centramos las flechas de navegación */
		}
	}
`;
