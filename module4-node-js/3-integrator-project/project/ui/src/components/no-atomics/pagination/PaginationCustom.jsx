import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	ArrowIcon,
	CustomArrow,
	CustomPaginationItem,
	PaginationContainer,
	PaginationCustomStyled,
	PaginationText,
	PaginationTextContainer,
} from "./PaginationCustomStyles";
import { IconButton, Pagination, PaginationItem, ThemeProvider } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PaginationCustom = ({ currentPage, totalPages, onPageChange, pathNavigate }) => {
	const navigate = useNavigate();
	const { page } = useParams();
	const [currentPageParam, setCurrentPageParam] = useState(page);
	const [isMounted, setIsMounted] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const isWindowWidthLessThan400 = windowWidth <= 400;
	const pageText = `${currentPageParam} de ${totalPages}`;
	const pagesNumberToShow = 4;

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
		setCurrentPageParam(page);
	}, [page]);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (isMounted) {
			if (!isNaN(currentPageParam) && currentPageParam >= 1 && currentPageParam <= totalPages) {
				setCurrentPageParam(Number(currentPageParam));
				onPageChange(Number(currentPageParam));
			} else {
				setCurrentPageParam(1);
				onPageChange(1);
				navigate(`${pathNavigate}/1`);
			}
		} else {
			setIsMounted(true);
		}
	}, [currentPageParam, totalPages, isMounted]);

	const handlePageChange = (event, newPage) => {
		// Si el nuevo número de página es válido, actualizamos la URL y el estado local de currentPage
		if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
			navigate(`${pathNavigate}/${newPage}`);
			setCurrentPageParam(newPage);
			onPageChange(newPage);
		}
	};

	const getPageNumbers = () => {
		const halfNumbersToShow = Math.floor(pagesNumberToShow / 2);
		const initialPosition = Math.min(Math.max(currentPageParam - halfNumbersToShow, 1), totalPages - pagesNumberToShow + 1);

		return Array.from({ length: pagesNumberToShow }, (_, index) => initialPosition + index);
	};

	const renderPaginationItem = (item) => {
		const pageNumbers = getPageNumbers();

		// Mostrar solo los 4 botones de página que deben estar visibles
		if (item.type === "page" && !pageNumbers.includes(item.page)) {
			return <></>;
		}

		// Oculto los puntos supensivos cuando las paginas son muchas
		if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
			return <></>;
		}

		if (item.type === "previous" && isWindowWidthLessThan400) {
			return (
				<>
					<PaginationItem {...item} onClick={(event) => handlePageChange(event, item.page)} icon={<ChevronLeftIcon />} />
					{isWindowWidthLessThan400 && <PaginationText>{pageText}</PaginationText>}
				</>
			);
		}

		if (item.type === "next" && isWindowWidthLessThan400) {
			return (
				<>
					<PaginationItem {...item} onClick={(event) => handlePageChange(event, item.page)} icon={<ChevronRightIcon />} />
				</>
			);
		}

		if (isWindowWidthLessThan400) {
			return null; // Para ocultar los números de página en móviles
		}

		return (
			<PaginationItem
				{...item}
				onClick={item.type === "previous" || item.type === "next" ? item.onClick : (event) => handlePageChange(event, item.page)}
			/>
		);
	};

	return (
		<PaginationCustomStyled
			color="primary"
			shape="rounded"
			variant="outlined"
			size="large"
			count={totalPages}
			page={currentPage}
			boundaryCount={0}
			siblingCount={Math.floor(pagesNumberToShow)}
			onChange={handlePageChange}
			renderItem={renderPaginationItem}
		/>
	);
};

export default PaginationCustom;
