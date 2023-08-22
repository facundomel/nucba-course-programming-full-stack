import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

	const nextPage = () => {
		if (currentPage !== nPages) setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage !== 1) setCurrentPage(currentPage - 1);
	};

	return (
		<>
			<nav>
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<Link className="page-link" onClick={prevPage} to={currentPage - 1 > 0 ? `?page=${currentPage - 1}` : `?page=1`}>
							Previous
						</Link>
					</li>
					{pageNumbers.map((pgNumber) => (
						<li key={pgNumber} className={`page-item ${currentPage == pgNumber ? "active" : ""} `}>
							<Link onClick={() => setCurrentPage(pgNumber)} to={`?page=${pgNumber}`} className="page-link">
								{pgNumber}
							</Link>
						</li>
					))}
					<li className="page-item">
						<Link
							className="page-link"
							onClick={nextPage}
							to={currentPage + 1 < pageNumbers.length ? `?page=${currentPage + 1}` : `?page=${pageNumbers.length}`}
						>
							Next
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
