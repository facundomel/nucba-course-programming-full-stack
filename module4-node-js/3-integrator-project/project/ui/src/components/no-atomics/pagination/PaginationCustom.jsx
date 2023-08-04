import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationCustomStyled } from "./PaginationCustomStyles";

const PaginationCustom = ({ currentPage, totalPages, onPageChange }) => {
	const navigate = useNavigate();
	const { page } = useParams();
	const [currentPageParam, setCurrentPageParam] = useState(page);

	useEffect(() => {
		if (!isNaN(currentPageParam) && currentPageParam >= 1 && currentPageParam <= totalPages) {
			setCurrentPageParam(Number(currentPageParam));
			onPageChange(Number(currentPageParam));
		} else {
			navigate(`/recetas/1`);
		}
	}, [currentPageParam, totalPages]);

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
		/>
	);
};

export default PaginationCustom;
