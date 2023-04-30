import React from "react";
import notFound from "../../../assets/images/page-not-found/page-not-found.png";
import { PageNotFoundContainer } from "./PageNotFoundStyles";

const PageNotFound = () => {
	return (
		<>
			<PageNotFoundContainer>
				<img src={notFound} alt="Page Not Found" />
			</PageNotFoundContainer>
		</>
	);
};

export default PageNotFound;
