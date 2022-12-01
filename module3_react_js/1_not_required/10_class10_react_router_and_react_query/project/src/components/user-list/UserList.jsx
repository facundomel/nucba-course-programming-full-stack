import React from "react";
import { Pagination } from "../pagination/Pagination";
import { User } from "../user/User";
import { ContainerUserListStyled } from "./UserListStyles";

export const UserList = ({ data, nPages, currentPage, setCurrentPage }) => {
	const userList = data.map((item) => <User key={item.id} data={item} />);

	return (
		<>
			<h2> Paginación </h2>
			<ContainerUserListStyled>{data.length ? userList : "No hay nada para mostrar"}</ContainerUserListStyled>;
			<Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	);
};
