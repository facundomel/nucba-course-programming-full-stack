import styled from "styled-components";

export const ImageContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: 160px;
	height: 160px;
	background-color: white;
	border: 5px black solid;
	border-radius: 100px;
`;

export const ImageBoxStyled = styled.div`
	position: relative;
	width: 124px;
	height: 124px;
	text-align: center;

	& img {
		width: 150px;
		height: 150px;
		position: absolute;
		bottom: 0px;
		right: 0;
		left: -10px;
	}
`;
