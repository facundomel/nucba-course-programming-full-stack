import styled from "styled-components";

export const CardsContainerStyled = styled.section`
	margin: 50px;
`;

export const CardStyled = styled.div`
	background-color: ${({ theme }) => theme.colors.quoteBgc};
	border: 1px solid ${({ theme }) => theme.colors.quoteBorder};
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 20px;
	border-radius: 3px;
	max-width: 450px;
`;

export const CardTitleStyled = styled.div`
	color: ${({ theme }) => theme.colors.quoteTitle};
	border-bottom: 1px solid ${({ theme }) => theme.colors.quoteBorder};
	text-align: center;
	padding: 10px;
	font-weight: bold;
`;

export const CardBodyStyled = styled.div`
	color: ${({ theme }) => theme.colors.quoteBody};
	padding: 10px;
`;
