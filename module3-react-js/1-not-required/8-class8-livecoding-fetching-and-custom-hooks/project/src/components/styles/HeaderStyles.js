import styled from "styled-components";

export const HeaderStyled = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.header};
	padding: 20px;
	text-align: center;
	font-weight: bold;
	width: 100%;
`;
