import React from "react";
import { ImageBoxStyled, ImageContainerStyled } from "./ImageStyles";

const Image = ({ image, alt }) => {
	return (
		<ImageContainerStyled>
			<ImageBoxStyled>
				<img src={image} alt={alt} />
			</ImageBoxStyled>
		</ImageContainerStyled>
	);
};

export default Image;
