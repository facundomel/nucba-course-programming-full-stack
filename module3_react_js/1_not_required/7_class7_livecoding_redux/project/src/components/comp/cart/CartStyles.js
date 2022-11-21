import styled from "styled-components";

export const CartContainerStyled = styled.div`
	width: 100vw;
	height: 50px;
	display: flex;
	justify-content: flex-end;
	font-family: Roboto;

	::-webkit-scrollbar {
		-webkit-appearance: none;
	}

	::-webkit-scrollbar:vertical {
		width: 3px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #797979;
		border-radius: 20px;
	}
`;

export const ButtonCartContainerStyled = styled.div`
	position: absolute;
	margin-top: 10px;
	margin-right: 20px;
	cursor: pointer;
	z-index: 2;

	&svg {
		height: 25px;
		margin-right: 2px;
	}
`;

export const ButtonCartStyled = styled.div`
	background-color: #222222;
	width: 60px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
`;

export const ProductsNumberStyled = styled.div`
	height: 20px;
	width: 20px;
	border-radius: 999px;
	position: absolute;
	top: 0;
	right: 0;
	background-color: #fb3939;
	font-size: 12px;
	font-weight: bold;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const CartStyled = styled.div`
	position: absolute;
	margin-top: 10px;
	margin-right: 20px;
	border-radius: 30px;
	width: 400px;
	background-color: #222222;
	color: white;

	h2 {
		text-align: center;
		font-weight: bold;
		margin-top: 35px;
	}

	p {
		text-align: center;
		margin-top: 5px;
		font-size: 14px;
	}
`;

export const TotalStyled = styled.h2`
	text-align: center;
	font-weight: bold;
	margin-top: 15px;
	padding-bottom: 35px;
`;

export const ProductsContainerStyled = styled.div`
	max-height: 200px;
	overflow-y: scroll;
	margin-top: 5px;
`;
