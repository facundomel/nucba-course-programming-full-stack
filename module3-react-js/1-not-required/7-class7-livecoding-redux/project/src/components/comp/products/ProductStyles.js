import styled from "styled-components";

export const ProductsContainerStyled = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 0fr);
	grid-row-gap: 20px;
	grid-column-gap: 75px;
	justify-items: center;
	justify-content: center;
`;

export const ProductStyled = styled.div`
	width: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

export const ImgStyled = styled.img`
	width: 100%;
`;

export const NameAndPriceStyled = styled.p`
	font-family: Roboto;
	text-align: center;
	font-weight: bolder;
	color: white;
`;

export const ButtonStyled = styled.button`
	border: none;
	border-radius: 3px;
	padding: 5px 10px;
	cursor: pointer;

	:hover {
		background-color: #cecece;
	}
`;
