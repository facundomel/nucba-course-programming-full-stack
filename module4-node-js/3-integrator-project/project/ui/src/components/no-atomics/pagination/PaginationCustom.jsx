import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationCustomStyled } from "./PaginationCustomStyles";
import { ThemeProvider } from "styled-components";
import { PaginationItem } from "@mui/material";

const PaginationCustom = ({ currentPage, totalPages, onPageChange }) => {
	const navigate = useNavigate();
	const { page } = useParams();
	const [currentPageParam, setCurrentPageParam] = useState(page);
	const [isMounted, setIsMounted] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (isMounted) {
			if (!isNaN(currentPageParam) && currentPageParam >= 1 && currentPageParam <= totalPages) {
				setCurrentPageParam(Number(currentPageParam));
				onPageChange(Number(currentPageParam));
			} else {
				navigate(`/recetas/1`);
			}
		} else {
			setIsMounted(true);
		}
	}, [currentPageParam, totalPages, isMounted]);

	const handlePageChange = (event, newPage) => {
		// Si el nuevo número de página es válido, actualizamos la URL y el estado local de currentPage
		if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
			navigate(`/recetas/${newPage}`);
			setCurrentPageParam(newPage);
			onPageChange(newPage);
		}
	};

	return (
		// <PaginationMaterial
		//   color="primary"
		//   shape="rounded"
		//   variant="outlined"
		//   size="large"
		//   count={totalPages}
		//   page={currentPage}
		//   onChange={handlePageChange}
		//   renderItem={(item) => (
		//     <PaginationItem
		//       {...item}
		//       sx={{
		//         backgroundColor: "blue", // Cambia aquí el color de fondo deseado
		//         "&.Mui-selected": {
		//           backgroundColor: "red", // Cambia aquí el color de fondo cuando el botón esté seleccionado
		//         },
		//       }}
		//     />
		//   )}
		// />
			<PaginationCustomStyled
				color="primary"
				shape="rounded"
				variant="outlined"
				size="large"
				count={totalPages}
				page={currentPage}
				onChange={handlePageChange}
				renderItem={(item) => {
					// Ocultar los botones numéricos si el ancho de la pantalla es menor o igual a 400px
					if (windowWidth <= 400 && item.type === "page") {
						return <></>;
					}
					return (
						<PaginationItem
							{...item}
							onClick={item.type === "previous" || item.type === "next" ? item.onClick : (event) => handlePageChange(event, item.page)}
						/>
					);
				}}
			/>
	);
};

export default PaginationCustom;
