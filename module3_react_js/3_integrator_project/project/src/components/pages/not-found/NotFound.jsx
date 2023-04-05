import React from "react";
import notFound from "../../../assets/images/page-not-found/page-not-found.png";
import { NotFoundContainer } from "./NotFoundStyles";

export const NotFound = () => {
	return (
		<>
			<NotFoundContainer>
				<img src={notFound} alt="Not Found" />
			</NotFoundContainer>
		</>
	);
};
