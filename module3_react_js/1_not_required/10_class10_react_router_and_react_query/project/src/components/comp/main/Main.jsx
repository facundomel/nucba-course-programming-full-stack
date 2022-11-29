import React, { useEffect, useState } from "react";
import { Pagination } from "../pagination/Pagination";
import { MainStyled } from "./MainStyles";
import axios from "axios";
import { UserList } from "../user-list/UserList";
import humps from "humps";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Error404 } from "../error-404/Error404";

export const Main = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(10);

	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(data.length / recordsPerPage);

	useEffect(() => {
		axios
			.get("data/data.json")
			.then((res) => {
				setData(humps.camelizeKeys(res.data));
				setLoading(false);
			})
			.catch(() => {
				alert("Hubo un error al obtener los datos");
			});
	}, []);

	return (
		<>
			<MainStyled>
				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<Navigate to="users?page=1" />} />
						<Route path="users"
							element={<UserList data={currentRecords} nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
						/>
						<Route path="*" element={<Error404 />} />
					</Routes>
				</BrowserRouter>
			</MainStyled>
		</>
	);
};
